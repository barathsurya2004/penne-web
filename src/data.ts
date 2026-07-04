import type { EasyPayState, User } from './types';

export const onboardData = [
  { t: 'Pay anyone,\nin one scan.', b: 'Scan any UPI QR and send money instantly — no account numbers, no waiting.' },
  { t: 'Your money,\nfully in control.', b: 'Track every rupee. Confirm each payment yourself so your history stays honest.' },
  { t: 'Powered by\nthe apps you trust.', b: 'Pay through Google Pay over UPI, right from EasyPay. Fast, familiar, secure.' },
];

export const debugUser: User = {
  name: 'Test User',
  phone: '90000 00000',
  email: 'test.user@easypay.dev',
  bank: 'Demo Bank',
};

export const initialState: EasyPayState = {
  screen: 'onboard',
  isAuthenticated: false,
  onboardIndex: 0,
  authMode: 'signup',
  authPhone: '',
  suName: '',
  suEmail: '',
  suBank: '',
  user: { name: '', phone: '', email: '', bank: '' },
  balance: 0,
  cameraFallback: false,
  upiValue: '',
  noteValue: '',
  amount: '',
  payee: null,
  showConfirm: false,
  selectedBudgetId: null,
  showAddBalance: false,
  addAmount: '',
  showBudgetPicker: false,
  showCreateBudget: false,
  newBudgetName: '',
  newBudgetAmt: '',
  newBudgetIcon: 'food',
  budgets: [],
  txns: [],
  showEditProfile: false,
  editName: '',
  editPhone: '',
  editEmail: '',
  editBank: '',
  editingBudgetId: null,
  showMyQr: false,
};
