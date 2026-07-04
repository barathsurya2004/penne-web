import { css } from '../lib/style';
import { scrollFieldIntoView } from '../lib/dom';
import type { EasyPayVals } from '../hooks/useEasyPay';

const inputStyle = css(
  "margin-top:8px;width:100%;background:#fff;border:1.5px solid #EBE6D9;border-radius:14px;padding:15px 16px;font-size:16px;color:#141414;outline:none;font-family:'Roboto',sans-serif",
);

export function Signup(V: EasyPayVals) {
  return (
    <div
      style={css(
        'position:absolute;inset:0;background:#F5F1E8;display:flex;flex-direction:column;padding:calc(20px + var(--safe-t)) 24px calc(26px + var(--safe-b));overflow-y:auto',
      )}
    >
      <button
        onClick={V.backToAuth}
        style={css('width:40px;height:40px;border-radius:13px;background:#fff;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;cursor:pointer;margin-top:6px;flex-shrink:0')}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={css('margin-top:22px')}>
        <h1 style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:26px;letter-spacing:-.6px;color:#141414;margin:0 0 8px")}>
          Tell us about you
        </h1>
        <p style={css('font-size:13.5px;color:#75705F;margin:0 8px 0 0;line-height:1.5')}>
          Just the basics to set up your profile. No card details, ever.
        </p>
      </div>
      <div style={css('margin-top:24px;display:flex;flex-direction:column;gap:16px')}>
        <div>
          <label style={css('font-size:12px;color:#8A8577;font-weight:500')}>Full name</label>
          <input value={V.suName} onChange={V.onSuName} onFocus={scrollFieldIntoView} placeholder="e.g. Aditi Rao" style={inputStyle} />
        </div>
        <div>
          <label style={css('font-size:12px;color:#8A8577;font-weight:500')}>Mobile number</label>
          <div style={css('margin-top:8px;display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #EBE6D9;border-radius:14px;padding:0 16px')}>
            <span style={css("font-family:'IBM Plex Sans',sans-serif;font-size:15px;color:#141414;font-weight:500;padding-right:11px;border-right:1px solid #EBE6D9")}>
              +91
            </span>
            <input
              value={V.authPhone}
              onChange={V.onAuthPhone}
              onFocus={scrollFieldIntoView}
              placeholder="98765 43210"
              inputMode="numeric"
              style={css("flex:1;border:none;outline:none;background:none;font-size:16px;color:#141414;padding:15px 0;font-family:'Roboto',sans-serif;letter-spacing:.5px")}
            />
          </div>
        </div>
        <div>
          <label style={css('font-size:12px;color:#8A8577;font-weight:500')}>
            Email <span style={css('color:#B4AE9E;font-weight:400')}>· optional</span>
          </label>
          <input
            value={V.suEmail}
            onChange={V.onSuEmail}
            onFocus={scrollFieldIntoView}
            placeholder="you@email.com"
            inputMode="email"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={css('font-size:12px;color:#8A8577;font-weight:500')}>
            Bank name <span style={css('color:#B4AE9E;font-weight:400')}>· optional</span>
          </label>
          <input value={V.suBank} onChange={V.onSuBank} onFocus={scrollFieldIntoView} placeholder="e.g. HDFC Bank" style={inputStyle} />
          <div style={css('display:flex;align-items:flex-start;gap:7px;margin-top:9px')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={css('flex-shrink:0;margin-top:1px')}>
              <circle cx="12" cy="12" r="9" stroke="#A29A86" strokeWidth="1.6" />
              <path d="M12 11v5M12 8v0" stroke="#A29A86" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <span style={css('font-size:11px;color:#A29A86;line-height:1.45')}>
              For your reference only — EasyPay never connects to your bank or stores credentials.
            </span>
          </div>
        </div>
      </div>
      <div style={css('height:18px;flex-shrink:0')} />
      <button
        onClick={V.finishSetup}
        disabled={V.finishDisabled}
        style={css(`width:100%;height:56px;border:none;border-radius:16px;background:${V.finishBtnBg};color:${V.finishBtnFg};font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:.2s;flex-shrink:0`)}
      >
        Create account
      </button>
    </div>
  );
}
