import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

const backBtn = css(
  "width:40px;height:40px;border-radius:13px;background:#fff;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;cursor:pointer",
);
const backIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <path d="M15 5l-7 7 7 7" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Login(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;display:flex;flex-direction:column;padding:calc(20px + var(--safe-t)) 26px calc(30px + var(--safe-b))')}>
      <button onClick={V.backToAuth} style={{ ...backBtn, marginTop: 6 }}>
        {backIcon}
      </button>
      <div style={css('margin-top:26px')}>
        <h1 style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:26px;letter-spacing:-.6px;color:#141414;margin:0 0 8px")}>
          Welcome back
        </h1>
        <p style={css('font-size:13.5px;color:#75705F;margin:0 20px 0 0;line-height:1.5')}>
          Enter your registered mobile number to jump back in.
        </p>
      </div>
      <div style={css('margin-top:30px')}>
        <label style={css('font-size:12px;color:#8A8577;font-weight:500')}>Mobile number</label>
        <div style={css('margin-top:8px;display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #EBE6D9;border-radius:15px;padding:0 16px')}>
          <span style={css("font-family:'IBM Plex Sans',sans-serif;font-size:15px;color:#141414;font-weight:500;padding-right:11px;border-right:1px solid #EBE6D9")}>
            +91
          </span>
          <input
            value={V.authPhone}
            onChange={V.onAuthPhone}
            placeholder="98765 43210"
            inputMode="numeric"
            style={css("flex:1;border:none;outline:none;background:none;font-size:16px;color:#141414;padding:16px 0;font-family:'Roboto',sans-serif;letter-spacing:.5px")}
          />
        </div>
      </div>
      <div style={css('flex:1')} />
      <button
        onClick={V.submitLogin}
        disabled={V.loginDisabled}
        style={css(`width:100%;height:56px;border:none;border-radius:16px;background:${V.loginBtnBg};color:${V.loginBtnFg};font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:.2s`)}
      >
        Continue
      </button>
      <p style={css('text-align:center;font-size:12.5px;color:#8A8577;margin:16px 0 0')}>
        New to EasyPay?{' '}
        <span onClick={V.startSignup} style={css('color:#141414;font-weight:600;cursor:pointer')}>
          Create an account
        </span>
      </p>
    </div>
  );
}
