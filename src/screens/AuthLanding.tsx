import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function AuthLanding(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#141414;display:flex;flex-direction:column;padding:calc(28px + var(--safe-t)) 28px calc(34px + var(--safe-b));color:#fff;overflow:hidden')}>
      <div style={css('position:absolute;right:-60px;top:40px;width:220px;height:220px;border:1px solid rgba(255,255,255,.08);border-radius:50%')} />
      <div style={css('position:absolute;right:20px;top:100px;width:150px;height:150px;border:1px solid rgba(255,255,255,.06);border-radius:50%')} />
      <span style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:22px;letter-spacing:-.4px")}>
        easypay<span style={css('color:#E68A9A')}>.</span>
      </span>
      <div style={css('flex:1;display:flex;flex-direction:column;justify-content:center;position:relative')}>
        <div style={css('width:60px;height:60px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;margin-bottom:24px')}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <h1 style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:31px;line-height:1.15;letter-spacing:-.9px;margin:0 0 14px;text-wrap:balance")}>
          Scan. Pay. <br />
          Keep the record.
        </h1>
        <p style={css('font-size:14.5px;line-height:1.6;color:rgba(255,255,255,.62);margin:0 12px 0 0')}>
          EasyPay isn't a bank. Scan any merchant, pay through the UPI app you already use, and every payment lands neatly in your history.
        </p>
      </div>
      <div style={css('display:flex;flex-direction:column;gap:11px;position:relative')}>
        <button
          onClick={V.startSignup}
          style={css("width:100%;height:56px;border:none;border-radius:16px;background:#fff;color:#141414;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15.5px;cursor:pointer")}
        >
          Create an account
        </button>
        <button
          onClick={V.startLogin}
          style={css("width:100%;height:56px;border:1.5px solid rgba(255,255,255,.28);background:none;color:#fff;border-radius:16px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15.5px;cursor:pointer")}
        >
          I already have an account
        </button>
        <p style={css('text-align:center;font-size:11px;color:rgba(255,255,255,.4);margin:8px 8px 0;line-height:1.5')}>
          By continuing you agree to our Terms &amp; Privacy. We never store your card or bank credentials.
        </p>
        <button
          onClick={V.debugLogin}
          style={css(
            "width:100%;height:40px;border:1px dashed rgba(255,255,255,.3);background:none;color:rgba(255,255,255,.55);border-radius:12px;font-family:'IBM Plex Sans',sans-serif;font-weight:500;font-size:12.5px;cursor:pointer;margin-top:2px",
          )}
        >
          Debug: skip to test account
        </button>
      </div>
    </div>
  );
}
