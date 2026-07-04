import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function ManualUpi(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;display:flex;flex-direction:column;padding:calc(20px + var(--safe-t)) 24px calc(30px + var(--safe-b))')}>
      <div style={css('display:flex;align-items:center;gap:14px;margin-top:6px')}>
        <button
          onClick={V.backToScan}
          style={css('width:40px;height:40px;border-radius:13px;background:#fff;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;cursor:pointer')}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:17px;color:#141414")}>Enter UPI ID</span>
      </div>
      <div style={css('margin-top:34px')}>
        <label style={css('font-size:12.5px;color:#8A8577;font-weight:500')}>UPI ID / Mobile number</label>
        <div style={css(`margin-top:10px;display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid ${V.upiBorder};border-radius:16px;padding:2px 16px;transition:.2s`)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20c0-3.3 3.1-6 7-6" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="17.5" cy="16.5" r="3.5" stroke="#141414" strokeWidth="1.4" />
          </svg>
          <input
            ref={V.upiInputRef}
            value={V.upiValue}
            onChange={V.onUpiInput}
            placeholder="name@bank or 98765 43210"
            inputMode="text"
            autoComplete="off"
            style={css("flex:1;border:none;outline:none;background:none;font-size:16px;color:#141414;padding:16px 0;font-family:'Roboto',sans-serif")}
          />
          {V.upiValid && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#7FBF9B" />
              <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div style={css('display:flex;gap:8px;margin-top:14px;flex-wrap:wrap')}>
          {V.upiSuggest.map((s, i) => (
            <button
              key={i}
              onClick={s.onClick}
              style={css("border:1px solid #E4DFD1;background:#FBF9F3;color:#5B564A;font-size:12px;padding:8px 12px;border-radius:99px;cursor:pointer;font-family:'Roboto',sans-serif")}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div style={css('flex:1')} />
      <button
        onClick={V.confirmUpi}
        disabled={V.upiDisabled}
        style={css(`width:100%;border:none;background:${V.upiBtnBg};color:${V.upiBtnFg};height:56px;border-radius:16px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:.2s`)}
      >
        Continue
      </button>
    </div>
  );
}
