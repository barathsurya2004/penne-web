import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import jsQR from 'jsqr';
import QRCode from 'qrcode';
import { debugUser, initialState, onboardData } from '../data';
import { GpayLogo, QrArt } from '../lib/icons';
import { budgetIcon, icon, onboardArts } from '../lib/glyphs';
import { parseUpiQr } from '../lib/upiQr';
import { buildUpiPayLink, openUpiApp } from '../lib/upiPay';
import { decodeQrFromImageFile } from '../lib/qrImage';
import { clearPersistedApp, loadPersistedApp, savePersistedApp } from '../lib/appStorage';
import type { BudgetIconKey, EasyPayState, Payee, Screen, Txn } from '../types';

export interface TxnRow {
  id: string;
  name: string;
  sub: string;
  amt: string;
  time: string;
  initials: string;
  amtColor: string;
  avBg: string;
  avFg: string;
  op: number;
  tag: string;
  tagColor: string;
  tagBg: string;
}

export interface BudgetRow {
  id: string;
  name: string;
  icon: ReactNode;
  spent: string;
  allocated: string;
  remaining: string;
  remainColor: string;
  pctW: string;
  barColor: string;
  onClick: () => void;
}

export interface PickerOption {
  id: string | null;
  name: string;
  sub: string;
  icon: ReactNode;
  selected: boolean;
  selBorder: string;
  onClick: () => void;
}

export interface ProfileRow {
  label: string;
  sub: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface IconChoice {
  key: BudgetIconKey;
  glyph: ReactNode;
  bg: string;
  onClick: () => void;
}

export interface ReceiptRow {
  k: string;
  v: string;
}

export interface AddChip {
  label: string;
  onClick: () => void;
}

export interface KeyItem {
  label: string;
  onClick: () => void;
}

export interface ActionItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

export interface UpiSuggestion {
  label: string;
  onClick: () => void;
}

function fmt(n: number) {
  return Number(n).toLocaleString('en-IN');
}

function initialsOf(name: string) {
  const p = (name || '').trim().split(/\s+/);
  return ((p[0] || '')[0] || '?').toUpperCase() + (p[1] ? p[1][0].toUpperCase() : '');
}

function nameFromUpi(upi: string) {
  if (/^\d/.test(upi)) return 'Mobile ' + upi.replace(/\s+/g, '').slice(0, 5) + '…';
  const h = (upi.split('@')[0] || 'user').replace(/[._]/g, ' ');
  return h.replace(/\b\w/g, (c) => c.toUpperCase());
}

function phoneOk(p: string) {
  return (p || '').replace(/\D/g, '').length >= 10;
}

export function useEasyPay() {
  const [state, setStateRaw] = useState<EasyPayState>(() => {
    const persisted = loadPersistedApp();
    if (persisted?.isAuthenticated) {
      return {
        ...initialState,
        isAuthenticated: true,
        user: persisted.user,
        balance: persisted.balance,
        budgets: persisted.budgets,
        txns: persisted.txns,
        screen: 'home',
      };
    }
    return initialState;
  });

  function setState(patch: Partial<EasyPayState> | ((prev: EasyPayState) => Partial<EasyPayState>)) {
    setStateRaw((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));
  }

  const videoRef = useRef<HTMLVideoElement>(null);
  const upiInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const dragRef = useRef<{ startX: number; max: number; x: number } | null>(null);
  const pendingTxnRef = useRef<Txn | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const [scanError, setScanError] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scanTick, setScanTick] = useState(0);
  const scanErrorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [slideBlockedTick, setSlideBlockedTick] = useState(0);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [myQrDataUrl, setMyQrDataUrl] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  function go(screen: Screen) {
    setState({ screen });
  }

  function resetScanFeedback() {
    setScanError(false);
    setScanSuccess(false);
  }

  useEffect(() => {
    if (state.isAuthenticated) {
      savePersistedApp({
        isAuthenticated: true,
        user: state.user,
        balance: state.balance,
        budgets: state.budgets,
        txns: state.txns,
      });
    } else {
      clearPersistedApp();
    }
  }, [state.isAuthenticated, state.user, state.balance, state.budgets, state.txns]);

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  function onScanned(p: { name: string; upi: string }) {
    stopCamera();
    setState({
      payee: { ...p, initials: initialsOf(p.name) },
      amount: '',
      noteValue: '',
      selectedBudgetId: null,
      screen: 'amount',
    });
  }

  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      setState({ cameraFallback: true });
    }
  }

  useEffect(() => {
    if (state.screen === 'scan') {
      // getUserMedia is an external async permission prompt; any setState it triggers happens later in a promise callback, not synchronously here
      // eslint-disable-next-line react-hooks/set-state-in-effect
      startCamera();
      return () => stopCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.screen]);

  useEffect(() => stopCamera, []);

  function triggerScanError() {
    setScanError(true);
    setScanTick((t) => t + 1);
    if (scanErrorTimerRef.current) clearTimeout(scanErrorTimerRef.current);
    scanErrorTimerRef.current = setTimeout(() => setScanError(false), 1600);
  }

  function triggerScanSuccess(parsed: { name: string; upi: string }) {
    setScanSuccess(true);
    setScanTick((t) => t + 1);
    setTimeout(() => onScanned(parsed), 450);
  }

  function triggerGalleryUpload() {
    galleryInputRef.current?.click();
  }

  async function onGalleryFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const text = await decodeQrFromImageFile(file);
    const parsed = text ? parseUpiQr(text) : null;
    if (parsed) triggerScanSuccess(parsed);
    else triggerScanError();
  }

  function openMyQr() {
    setState({ showMyQr: true });
  }
  function closeMyQr(e?: { target: EventTarget | null; currentTarget: EventTarget | null }) {
    if (!e || e.target === e.currentTarget) setState({ showMyQr: false });
  }

  useEffect(() => {
    if (!state.isAuthenticated) return;
    const vpa = (state.user.phone ? state.user.phone.replace(/\s+/g, '') : 'user') + '@easypay';
    // no "am" param — a receive code lets the payer key in their own amount, unlike a merchant QR
    const params = new URLSearchParams({ pa: vpa, pn: state.user.name || 'EasyPay user', cu: 'INR' });
    const link = `upi://pay?${params.toString()}`;
    let cancelled = false;
    QRCode.toDataURL(link, { margin: 1, width: 320 })
      .then((url) => {
        if (!cancelled) setMyQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setMyQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [state.isAuthenticated, state.user.phone, state.user.name]);

  // ---------- real-time QR decode loop ----------
  useEffect(() => {
    if (state.screen !== 'scan' || state.cameraFallback) return;

    let stopped = false;
    let raf = 0;
    let lastTick = 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Chrome exposes window.BarcodeDetector on platforms where the actual decode
    // backend isn't installed (notably desktop Linux) — detect() then just resolves
    // empty forever with no error. jsQR has no such gap, so it's the only path used.
    function decodeFrame(video: HTMLVideoElement): string | null {
      if (!ctx || !video.videoWidth) return null;
      const w = Math.min(video.videoWidth, 640);
      const h = Math.round(video.videoHeight * (w / video.videoWidth));
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(video, 0, 0, w, h);
      const frame = ctx.getImageData(0, 0, w, h);
      const code = jsQR(frame.data, w, h, { inversionAttempts: 'attemptBoth' });
      return code?.data ?? null;
    }

    function tick(ts: number) {
      if (stopped) return;
      if (ts - lastTick < 150) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastTick = ts;
      const video = videoRef.current;
      if (video && video.readyState >= 2 && video.videoWidth) {
        try {
          const text = decodeFrame(video);
          if (text) {
            const parsed = parseUpiQr(text);
            if (parsed) {
              stopped = true;
              triggerScanSuccess(parsed);
              return;
            }
            triggerScanError();
          }
        } catch {
          // a single bad frame isn't fatal — just keep scanning
        }
      }
      if (!stopped) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      if (scanErrorTimerRef.current) clearTimeout(scanErrorTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.screen, state.cameraFallback]);

  function pressKey(k: string) {
    setState((s) => {
      let a = s.amount;
      if (k === '⌫') a = a.slice(0, -1);
      else if (k === '.') {
        if (!a.includes('.') && a) a = a + '.';
      } else {
        if (a.includes('.') && a.split('.')[1].length >= 2) return {};
        if (a === '0' && k !== '.') a = k;
        else a = a + k;
        if (a.replace('.', '').length > 7) return {};
      }
      return { amount: a };
    });
  }

  function onSlideMove(e: PointerEvent) {
    if (!dragRef.current || !knobRef.current || !fillRef.current) return;
    const x = Math.max(0, Math.min(dragRef.current.max, e.clientX - dragRef.current.startX));
    dragRef.current.x = x;
    knobRef.current.style.transform = `translateX(${x}px)`;
    fillRef.current.style.width = 62 + x + 'px';
    if (x >= dragRef.current.max - 2) completeSlide();
  }

  function onSlideUp() {
    window.removeEventListener('pointermove', onSlideMove);
    window.removeEventListener('pointerup', onSlideUp);
    if (!dragRef.current) return;
    const done = dragRef.current.x >= dragRef.current.max - 2;
    dragRef.current = null;
    if (!done && knobRef.current && fillRef.current) {
      knobRef.current.style.transition = 'transform .25s';
      fillRef.current.style.transition = 'width .25s';
      knobRef.current.style.transform = 'translateX(0)';
      fillRef.current.style.width = '62px';
    }
  }

  function onSlideDown(e: ReactPointerEvent<HTMLDivElement>) {
    const amt = currentAmount();
    if (amt <= 0 || amt > stateRef.current.balance) {
      setSlideBlockedTick((t) => t + 1);
      return;
    }
    const track = trackRef.current;
    const knob = knobRef.current;
    if (!track || !knob || !fillRef.current) return;
    const max = track.clientWidth - knob.clientWidth - 10;
    dragRef.current = { startX: e.clientX, max, x: 0 };
    knob.style.transition = 'none';
    fillRef.current.style.transition = 'none';
    if (knob.setPointerCapture) knob.setPointerCapture(e.pointerId);
    window.addEventListener('pointermove', onSlideMove);
    window.addEventListener('pointerup', onSlideUp);
  }

  function currentAmount() {
    return Math.round(parseFloat(stateRef.current.amount || '0') * 100) / 100;
  }

  function completeSlide() {
    if (!dragRef.current) return;
    window.removeEventListener('pointermove', onSlideMove);
    window.removeEventListener('pointerup', onSlideUp);
    dragRef.current = null;
    const amt = currentAmount();
    const p = stateRef.current.payee as Payee;
    const txn: Txn = {
      // eslint-disable-next-line react-hooks/purity -- runs from a pointer gesture (window listener), not during render
      id: 'p' + Date.now(),
      name: p.name,
      sub: stateRef.current.noteValue || 'UPI payment',
      amt: '-₹' + fmt(amt),
      dir: -1,
      time: 'Just now',
      pending: true,
      upi: p.upi,
      initials: p.initials,
      raw: amt,
      budgetId: stateRef.current.selectedBudgetId,
    };
    pendingTxnRef.current = txn;
    // note the transaction immediately and jump straight to the receipt, with the
    // confirm sheet overlaid on top asking to verify the external app actually went through
    setState((s) => ({ txns: [txn, ...s.txns], balance: s.balance - amt, screen: 'receipt', showConfirm: true }));
    openUpiApp(buildUpiPayLink(p, amt, stateRef.current.noteValue));
  }

  function confirmYes() {
    setState((s) => ({
      txns: s.txns.map((t) => (t.id === pendingTxnRef.current?.id ? { ...t, pending: false } : t)),
      showConfirm: false,
    }));
  }

  function confirmNo() {
    const amt = pendingTxnRef.current?.raw ?? 0;
    setState((s) => ({
      txns: s.txns.filter((t) => t.id !== pendingTxnRef.current?.id),
      balance: s.balance + amt,
      screen: 'home',
      showConfirm: false,
    }));
    pendingTxnRef.current = null;
  }

  function spentOf(bid: string | null) {
    return stateRef.current.txns
      .filter((t) => t.budgetId === bid && t.dir < 0 && !t.pending)
      .reduce((sum, t) => sum + (t.raw || 0), 0);
  }

  function confirmAddBalance() {
    const amt = Math.round(parseFloat(stateRef.current.addAmount || '0'));
    if (!amt) return;
    const txn: Txn = {
      id: 'a' + Date.now(),
      name: 'Added to EasyPay',
      sub: 'Bank transfer',
      raw: amt,
      amt: '+₹' + fmt(amt),
      dir: 1,
      time: 'Just now',
      budgetId: null,
    };
    setState((s) => ({ balance: s.balance + amt, txns: [txn, ...s.txns], showAddBalance: false, addAmount: '' }));
  }

  function createBudget() {
    const name = stateRef.current.newBudgetName.trim();
    const amt = Math.round(parseFloat(stateRef.current.newBudgetAmt || '0'));
    if (!name || !amt) return;
    const editingId = stateRef.current.editingBudgetId;
    setState((s) => ({
      budgets: editingId
        ? s.budgets.map((b) => (b.id === editingId ? { ...b, name, allocated: amt, icon: s.newBudgetIcon } : b))
        : [...s.budgets, { id: 'b' + Date.now(), name, allocated: amt, icon: s.newBudgetIcon }],
      showCreateBudget: false,
      editingBudgetId: null,
      newBudgetName: '',
      newBudgetAmt: '',
      newBudgetIcon: 'food',
    }));
  }

  function openEditBudget(bid: string) {
    const b = stateRef.current.budgets.find((x) => x.id === bid);
    if (!b) return;
    setState({
      showCreateBudget: true,
      editingBudgetId: bid,
      newBudgetName: b.name,
      newBudgetAmt: String(b.allocated),
      newBudgetIcon: b.icon,
    });
  }

  function deleteBudget(bid: string) {
    setState((s) => ({
      budgets: s.budgets.filter((b) => b.id !== bid),
      selectedBudgetId: s.selectedBudgetId === bid ? null : s.selectedBudgetId,
    }));
  }

  function pickBudget(bid: string | null) {
    setState({ selectedBudgetId: bid, showBudgetPicker: false });
  }

  function openEditProfile() {
    const u = stateRef.current.user;
    setState({ showEditProfile: true, editName: u.name, editPhone: u.phone, editEmail: u.email, editBank: u.bank });
  }
  function closeEditProfile() {
    setState({ showEditProfile: false });
  }
  function saveEditProfile() {
    const name = stateRef.current.editName.trim();
    if (!name) return;
    setState((s) => ({
      user: { ...s.user, name, phone: s.editPhone.trim(), email: s.editEmail.trim(), bank: s.editBank.trim() },
      showEditProfile: false,
    }));
  }

  function goAuth() {
    go('auth');
  }
  function startSignup() {
    setState({ authMode: 'signup', authPhone: '', suName: '', suEmail: '', suBank: '', screen: 'signup' });
  }
  function startLogin() {
    setState({ authMode: 'login', authPhone: '', screen: 'login' });
  }
  function submitLogin() {
    if (phoneOk(stateRef.current.authPhone)) setState({ screen: 'home', isAuthenticated: true });
  }
  function finishSetup() {
    const name = stateRef.current.suName.trim();
    if (!name) return;
    setState({
      user: {
        name,
        phone: stateRef.current.authPhone.trim(),
        email: stateRef.current.suEmail.trim(),
        bank: stateRef.current.suBank.trim(),
      },
      screen: 'home',
      isAuthenticated: true,
    });
  }
  function debugLogin() {
    setState({ user: debugUser, screen: 'home', isAuthenticated: true });
  }
  function logout() {
    clearPersistedApp();
    pendingTxnRef.current = null;
    setStateRaw({ ...initialState, screen: 'auth' });
  }

  function deleteAllData() {
    if (
      !window.confirm(
        'Delete all your EasyPay data? This clears your balance, transactions, budgets, and profile — it cannot be undone.',
      )
    )
      return;
    clearPersistedApp();
    pendingTxnRef.current = null;
    setStateRaw({ ...initialState, screen: 'onboard' });
  }

  function goHome() {
    go('home');
  }
  function openScan() {
    resetScanFeedback();
    setState({ screen: 'scan', cameraFallback: false });
  }
  function switchToManual() {
    stopCamera();
    setState({ upiValue: '', screen: 'upi' });
    setTimeout(() => upiInputRef.current && upiInputRef.current.focus(), 60);
  }
  function onScannedManual(upi: string) {
    const name = nameFromUpi(upi);
    setState({ payee: { name, upi, initials: initialsOf(name) }, amount: '', noteValue: '', selectedBudgetId: null, screen: 'amount' });
  }

  // ---------- derived view values (mirrors renderVals in the original prototype) ----------
  const s = state;
  const ob = onboardData[s.onboardIndex];
  const amt = currentAmount();
  const insufficientBalance = amt > 0 && amt > s.balance;
  const payee = s.payee || ({} as Partial<Payee>);
  const upiClean = s.upiValue.trim();
  const upiValid = /@/.test(upiClean) ? /^[\w.-]+@[\w.-]+$/.test(upiClean) : /^\d[\d\s]{8,}$/.test(upiClean);
  const now = new Date();
  const timeStr = now.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true });
  const txnId = 'EPX' + String(now.getTime()).slice(-9);

  const budgetName = (bid: string | null) => {
    const b = s.budgets.find((x) => x.id === bid);
    return b ? b.name : null;
  };
  const mapTxn = (t: Txn): TxnRow => ({
    id: t.id,
    name: t.name,
    sub: t.sub,
    amt: t.amt,
    time: t.time,
    initials: initialsOf(t.name),
    amtColor: t.dir > 0 ? '#2E7D52' : '#20201C',
    avBg: t.dir > 0 ? '#E3EFE8' : '#EFEADD',
    avFg: t.dir > 0 ? '#2E7D52' : '#141414',
    op: t.pending ? 0.5 : 1,
    tag: t.dir > 0 ? 'Income' : budgetName(t.budgetId) || 'Unallocated',
    tagColor: t.budgetId ? '#5B564A' : '#A29A86',
    tagBg: t.budgetId ? '#EFEADD' : '#F4F1E8',
  });
  const txns = s.txns.slice(0, 4).map(mapTxn);
  const filteredTxns = s.txns.filter((t) =>
    historyFilter === 'all' ? true : historyFilter === 'sent' ? t.dir < 0 : t.dir > 0,
  );
  const allTxns = filteredTxns.map(mapTxn);

  const monthOut = s.txns.filter((t) => t.dir < 0 && !t.pending).reduce((a, t) => a + (t.raw || 0), 0);
  const monthIn = s.txns.filter((t) => t.dir > 0 && !t.pending).reduce((a, t) => a + (t.raw || 0), 0);

  const totalAllocated = s.budgets.reduce((a, b) => a + b.allocated, 0);
  const totalSpent = s.budgets.reduce((a, b) => a + spentOf(b.id), 0);
  const budgetsList: BudgetRow[] = s.budgets.map((b) => {
    const spent = spentOf(b.id);
    const pct = b.allocated ? Math.min(100, Math.round((spent / b.allocated) * 100)) : 0;
    const over = spent > b.allocated;
    return {
      id: b.id,
      name: b.name,
      icon: budgetIcon(b.icon, 22, '#141414'),
      spent: '₹' + fmt(spent),
      allocated: '₹' + fmt(b.allocated),
      remaining: over ? '₹' + fmt(spent - b.allocated) + ' over' : '₹' + fmt(b.allocated - spent) + ' left',
      remainColor: over ? '#C0455B' : '#7A755F',
      pctW: pct + '%',
      barColor: over ? '#C0455B' : '#141414',
      onClick: () => pickBudget(b.id),
    };
  });

  const pickerOptions: PickerOption[] = [
    {
      id: null,
      name: 'Unallocated pool',
      sub: 'Not tracked against a budget',
      icon: icon(['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M12 8v4l3 2'], 20, '#8A8577'),
      selected: s.selectedBudgetId === null,
      selBorder: s.selectedBudgetId === null ? '#141414' : '#EBE6D9',
      onClick: () => pickBudget(null),
    },
    ...s.budgets.map((b) => {
      const spent = spentOf(b.id);
      return {
        id: b.id,
        name: b.name,
        sub: '₹' + fmt(spent) + ' of ₹' + fmt(b.allocated) + ' used',
        icon: budgetIcon(b.icon, 20, '#141414'),
        selected: s.selectedBudgetId === b.id,
        selBorder: s.selectedBudgetId === b.id ? '#141414' : '#EBE6D9',
        onClick: () => pickBudget(b.id),
      };
    }),
  ];
  const selBudget = s.budgets.find((b) => b.id === s.selectedBudgetId);
  const selBudgetLabel = selBudget ? selBudget.name : 'Unallocated';

  const profileRows: ProfileRow[] = [
    {
      label: 'Personal details',
      sub: s.user.phone ? '+91 ' + s.user.phone : 'Add mobile number',
      icon: icon(['M12 12a4 4 0 100-8 4 4 0 000 8z', 'M5 20c0-3.3 3.1-6 7-6'], 18, '#141414'),
      onClick: openEditProfile,
    },
    {
      label: 'Linked bank',
      sub: s.user.bank ? s.user.bank + ' · optional' : 'Not added · optional',
      icon: icon(['M4 10l8-5 8 5', 'M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18'], 18, '#141414'),
      onClick: openEditProfile,
    },
    {
      label: 'Default payment app',
      sub: 'Google Pay · change anytime',
      icon: icon(['M4 7h16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z', 'M3 11h18'], 18, '#141414'),
    },
    {
      label: 'Security & app lock',
      sub: 'PIN, biometrics',
      icon: icon(['M6 11V8a6 6 0 0112 0v3', 'M5 11h14v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9z'], 18, '#141414'),
    },
    {
      label: 'Notifications',
      sub: 'Alerts & reminders',
      icon: icon(['M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z', 'M10 20a2 2 0 004 0'], 18, '#141414'),
    },
    {
      label: 'Help & support',
      sub: 'FAQs, contact us',
      icon: icon(
        ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M9.5 9.5a2.5 2.5 0 013.5-1.5c1.5.7 1.5 2.5 0 3.2-.8.4-1 .9-1 1.8M12 16v0'],
        18,
        '#141414',
      ),
    },
  ];

  const iconChoices: IconChoice[] = (['food', 'shop', 'transit', 'bills', 'fun', 'health', 'home', 'misc'] as BudgetIconKey[]).map(
    (k) => ({
      key: k,
      glyph: budgetIcon(k, 20, s.newBudgetIcon === k ? '#fff' : '#141414'),
      bg: s.newBudgetIcon === k ? '#141414' : '#fff',
      onClick: () => setState({ newBudgetIcon: k }),
    }),
  );

  const upiSuggest: UpiSuggestion[] = ['@oksbi', '@okhdfcbank', '@ybl'].map((suf) => ({
    label: suf,
    onClick: () => {
      const base = upiClean.split('@')[0] || 'arjun';
      setState({ upiValue: base + suf });
    },
  }));

  const actions: ActionItem[] = [
    {
      label: 'Scan',
      icon: icon(['M4 8V5a1 1 0 011-1h3', 'M16 4h3a1 1 0 011 1v3', 'M20 16v3a1 1 0 01-1 1h-3', 'M8 20H5a1 1 0 01-1-1v-3', 'M4 12h16']),
      onClick: openScan,
    },
    { label: 'To Mobile', icon: icon(['M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1z', 'M11 18h2']), onClick: openScan },
    { label: 'To Bank', icon: icon(['M4 10l8-5 8 5', 'M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18']), onClick: openScan },
    { label: 'Request', icon: icon(['M12 5v14', 'M5 12h14', 'M16 8l-4-4-4 4']), onClick: openScan },
  ];

  const receiptRows: ReceiptRow[] = [
    { k: 'To', v: payee.name || '' },
    { k: 'UPI transaction ID', v: txnId },
    { k: 'Note', v: s.noteValue || '—' },
    { k: 'Paid from', v: 'EasyPay · ••4821' },
    { k: 'Date & time', v: timeStr },
  ];

  const dotW = (i: number) => (s.onboardIndex === i ? '22px' : '7px');
  const dotC = (i: number) => (s.onboardIndex === i ? '#141414' : '#CFC8B7');

  const keys: KeyItem[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => ({
    label: k,
    onClick: () => pressKey(k),
  }));

  const addChips: AddChip[] = [500, 1000, 1500, 2000].map((v) => ({
    label: '+ ₹' + fmt(v),
    onClick: () => setState({ addAmount: String(v) }),
  }));

  return {
    state,
    setState,
    videoRef,
    upiInputRef,
    trackRef,
    knobRef,
    fillRef,
    stopProp: (e: { stopPropagation: () => void }) => e.stopPropagation(),

    // screen flags
    screenOnboard: s.screen === 'onboard',
    screenAuth: s.screen === 'auth',
    screenLogin: s.screen === 'login',
    screenSignup: s.screen === 'signup',
    screenHome: s.screen === 'home',
    screenScan: s.screen === 'scan',
    screenUpi: s.screen === 'upi',
    screenAmount: s.screen === 'amount',
    screenReceipt: s.screen === 'receipt',
    screenHistory: s.screen === 'history',
    screenBudgets: s.screen === 'budgets',
    screenProfile: s.screen === 'profile',

    // tab bar
    showTabBar: ['home', 'history', 'budgets', 'profile'].includes(s.screen),
    navHomeC: s.screen === 'home' ? '#141414' : '#B4AE9E',
    navHistC: s.screen === 'history' ? '#141414' : '#B4AE9E',
    navBudgC: s.screen === 'budgets' ? '#141414' : '#B4AE9E',
    navProfC: s.screen === 'profile' ? '#141414' : '#B4AE9E',
    goHistory: () => go('history'),
    goBudgets: () => go('budgets'),
    goProfile: () => go('profile'),
    goHome,
    goAuth,

    // history
    allTxns,
    historyFilter,
    setHistoryFilterAll: () => setHistoryFilter('all'),
    setHistoryFilterSent: () => setHistoryFilter('sent'),
    setHistoryFilterReceived: () => setHistoryFilter('received'),
    monthOutFmt: '₹' + fmt(monthOut),
    monthInFmt: '₹' + fmt(monthIn),

    // budgets
    budgetsList,
    totalAllocatedFmt: '₹' + fmt(totalAllocated),
    totalSpentFmt: '₹' + fmt(totalSpent),
    totalLeftFmt: '₹' + fmt(Math.max(0, totalAllocated - totalSpent)),
    budgetsPct: totalAllocated ? Math.min(100, Math.round((totalSpent / totalAllocated) * 100)) + '%' : '0%',
    openCreateBudget: () =>
      setState({ showCreateBudget: true, editingBudgetId: null, newBudgetName: '', newBudgetAmt: '', newBudgetIcon: 'food' }),
    openEditBudget,
    deleteBudget,

    // profile
    profileRows,
    openEditProfile,

    // edit profile modal
    showEditProfile: s.showEditProfile,
    editName: s.editName,
    editPhone: s.editPhone,
    editEmail: s.editEmail,
    editBank: s.editBank,
    onEditName: (e: ChangeEvent<HTMLInputElement>) => setState({ editName: e.target.value }),
    onEditPhone: (e: ChangeEvent<HTMLInputElement>) => setState({ editPhone: (e.target.value || '').replace(/[^0-9 ]/g, '').slice(0, 11) }),
    onEditEmail: (e: ChangeEvent<HTMLInputElement>) => setState({ editEmail: e.target.value }),
    onEditBank: (e: ChangeEvent<HTMLInputElement>) => setState({ editBank: e.target.value }),
    saveEditProfile,
    saveEditProfileDisabled: !s.editName.trim(),
    closeEditProfile: (e?: { target: EventTarget | null; currentTarget: EventTarget | null }) => {
      if (!e || e.target === e.currentTarget) closeEditProfile();
    },

    // create/edit budget modal
    showCreateBudget: s.showCreateBudget,
    editingBudgetId: s.editingBudgetId,
    createBudgetTitle: s.editingBudgetId ? 'Edit budget' : 'New budget',
    createBudgetBtnLabel: s.editingBudgetId ? 'Save changes' : 'Create budget',
    newBudgetName: s.newBudgetName,
    newBudgetAmt: s.newBudgetAmt,
    onNewBudgetName: (e: ChangeEvent<HTMLInputElement>) => setState({ newBudgetName: e.target.value }),
    onNewBudgetAmt: (e: ChangeEvent<HTMLInputElement>) => setState({ newBudgetAmt: e.target.value.replace(/[^0-9]/g, '') }),
    iconChoices,
    createBudget,
    createDisabled: !(s.newBudgetName.trim() && parseFloat(s.newBudgetAmt || '0') > 0),
    createBtnBg: s.newBudgetName.trim() && parseFloat(s.newBudgetAmt || '0') > 0 ? '#141414' : '#DED8C8',
    createBtnFg: s.newBudgetName.trim() && parseFloat(s.newBudgetAmt || '0') > 0 ? '#fff' : '#A69F8C',
    closeCreateBudget: (e?: { target: EventTarget | null; currentTarget: EventTarget | null }) => {
      if (!e || e.target === e.currentTarget) setState({ showCreateBudget: false, editingBudgetId: null });
    },

    // budget picker (on amount screen)
    showBudgetPicker: s.showBudgetPicker,
    openBudgetPicker: () => setState({ showBudgetPicker: true }),
    closeBudgetPicker: (e?: { target: EventTarget | null; currentTarget: EventTarget | null }) => {
      if (!e || e.target === e.currentTarget) setState({ showBudgetPicker: false });
    },
    pickerOptions,
    selBudgetLabel,
    selBudgetDot: selBudget ? '#141414' : '#C6BEA9',
    pickerNewBudget: () =>
      setState({
        showBudgetPicker: false,
        showCreateBudget: true,
        editingBudgetId: null,
        newBudgetName: '',
        newBudgetAmt: '',
        newBudgetIcon: 'food',
      }),

    // onboarding
    onboardKey: 'ob' + s.onboardIndex,
    onboardTitle: ob.t,
    onboardBody: ob.b,
    onboardArt: onboardArts[s.onboardIndex],
    dot0w: dotW(0),
    dot1w: dotW(1),
    dot2w: dotW(2),
    dot0c: dotC(0),
    dot1c: dotC(1),
    dot2c: dotC(2),
    nextOnboard: () => {
      if (s.onboardIndex < 2) setState({ onboardIndex: s.onboardIndex + 1 });
      else go('auth');
    },

    // auth landing
    startSignup,
    startLogin,
    backToAuth: () => go('auth'),
    debugLogin,
    logout,
    deleteAllData,

    // login
    authPhone: s.authPhone,
    onAuthPhone: (e: ChangeEvent<HTMLInputElement>) => setState({ authPhone: (e.target.value || '').replace(/[^0-9 ]/g, '').slice(0, 11) }),
    loginDisabled: !phoneOk(s.authPhone),
    submitLogin,
    loginBtnBg: phoneOk(s.authPhone) ? '#141414' : '#DED8C8',
    loginBtnFg: phoneOk(s.authPhone) ? '#fff' : '#A69F8C',

    // signup
    suName: s.suName,
    suEmail: s.suEmail,
    suBank: s.suBank,
    onSuName: (e: ChangeEvent<HTMLInputElement>) => setState({ suName: e.target.value }),
    onSuEmail: (e: ChangeEvent<HTMLInputElement>) => setState({ suEmail: e.target.value }),
    onSuBank: (e: ChangeEvent<HTMLInputElement>) => setState({ suBank: e.target.value }),
    finishSetup,
    finishDisabled: !s.suName.trim(),
    finishBtnBg: s.suName.trim() ? '#141414' : '#DED8C8',
    finishBtnFg: s.suName.trim() ? '#fff' : '#A69F8C',

    // home
    balanceFmt: fmt(s.balance) + '.00',
    actions,
    txns,
    openScan,
    userName: s.user.name || 'EasyPay user',
    userInitials: initialsOf(s.user.name || 'EasyPay user'),
    userSub: s.user.email || (s.user.phone ? '+91 ' + s.user.phone : 'EasyPay member'),

    // add balance
    showAddBalance: s.showAddBalance,
    addAmount: s.addAmount,
    addAmountDisplay: s.addAmount === '' ? '0' : fmt(parseInt(s.addAmount, 10)),
    addAmountColor: s.addAmount === '' ? '#C9C2B1' : '#141414',
    openAddBalance: () => setState({ showAddBalance: true, addAmount: '' }),
    closeAddBalance: (e?: { target: EventTarget | null; currentTarget: EventTarget | null }) => {
      if (!e || e.target === e.currentTarget) setState({ showAddBalance: false });
    },
    onAddAmount: (e: ChangeEvent<HTMLInputElement>) => setState({ addAmount: (e.target.value || '').replace(/[^0-9]/g, '').slice(0, 7) }),
    addChips,
    confirmAddBalance,
    addDisabled: !(parseInt(s.addAmount || '0', 10) > 0),
    addBtnBg: parseInt(s.addAmount || '0', 10) > 0 ? '#141414' : '#DED8C8',
    addBtnFg: parseInt(s.addAmount || '0', 10) > 0 ? '#fff' : '#A69F8C',

    // scanner
    videoOpacity: s.cameraFallback ? 0 : 1,
    cameraFallback: s.cameraFallback,
    qrArt: <QrArt />,
    scanHint: s.cameraFallback
      ? 'Point at a UPI QR code'
      : scanSuccess
        ? 'QR verified'
        : scanError
          ? "That's not a UPI QR code — try another"
          : 'Looking for a QR code…',
    scanError,
    scanSuccess,
    scanTick,
    switchToManual,
    backToScan: () => {
      resetScanFeedback();
      setState({ screen: 'scan', cameraFallback: false });
    },
    galleryInputRef,
    triggerGalleryUpload,
    onGalleryFile,

    // my QR (receive money)
    showMyQr: s.showMyQr,
    openMyQr,
    closeMyQr,
    myQrDataUrl,
    myQrVpa: (s.user.phone ? s.user.phone.replace(/\s+/g, '') : 'user') + '@easypay',

    // upi entry
    upiValue: s.upiValue,
    onUpiInput: (e: ChangeEvent<HTMLInputElement>) => setState({ upiValue: e.target.value }),
    upiValid,
    upiBorder: upiClean ? (upiValid ? '#7FBF9B' : '#EBE6D9') : '#EBE6D9',
    upiSuggest,
    upiDisabled: !upiValid,
    upiBtnBg: upiValid ? '#141414' : '#DED8C8',
    upiBtnFg: upiValid ? '#fff' : '#A69F8C',
    confirmUpi: () => {
      if (!upiValid) return;
      onScannedManual(upiClean);
    },

    // amount
    payeeName: payee.name || '',
    payeeUpi: payee.upi || '',
    payeeInitials: payee.initials || '',
    amountDisplay: s.amount === '' ? '0' : s.amount,
    amountColor: s.amount === '' ? '#C9C2B1' : '#141414',
    noteValue: s.noteValue,
    onNoteInput: (e: ChangeEvent<HTMLInputElement>) => setState({ noteValue: e.target.value }),
    keys,
    backFromAmount: () => {
      resetScanFeedback();
      setState({ screen: 'scan', cameraFallback: false });
    },
    onSlideDown,
    gpayLogo: <GpayLogo />,
    insufficientBalance,
    slideBlockedTick,

    // confirm (overlaid on the receipt right after the slide-to-pay handoff)
    showConfirm: s.showConfirm,
    confirmYes,
    confirmNo,

    // receipt
    receiptTime: timeStr,
    receiptRows,
    shareCopied,
    shareReceipt: async () => {
      const text = `Paid ₹${s.amount || '0'} to ${payee.name || ''} (${payee.upi || ''}) via UPI · Google Pay\n${timeStr}`;
      if (navigator.share) {
        try {
          await navigator.share({ title: 'EasyPay receipt', text });
          return;
        } catch {
          // user dismissed the share sheet, or the platform doesn't actually support it — fall back to clipboard
        }
      }
      try {
        await navigator.clipboard.writeText(text);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 1800);
      } catch {
        // clipboard unavailable (insecure context, permissions) — nothing more we can do here
      }
    },
    finishToHome: () => {
      setState({ screen: 'home', amount: '', noteValue: '', payee: null, upiValue: '' });
      pendingTxnRef.current = null;
    },
  };
}

export type EasyPayVals = ReturnType<typeof useEasyPay>;
