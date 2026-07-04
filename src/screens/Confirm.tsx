import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Confirm(V: EasyPayVals) {
  if (!V.showConfirm) return null;
  return (
    <div style={css('position:absolute;inset:0;background:rgba(20,20,20,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-end;z-index:70')}>
      <div style={css('width:100%;background:#F5F1E8;border-radius:28px 28px 0 0;padding:28px 24px calc(30px + var(--safe-b));animation:ep-rise .35s ease both')}>
        <div style={css('width:44px;height:5px;border-radius:99px;background:#DAD4C4;margin:0 auto 22px')} />
        <div style={css('width:60px;height:60px;border-radius:18px;background:#fff;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;margin:0 auto')}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v6M12 21v0M12 14a2 2 0 100-4 2 2 0 000 4z" stroke="#141414" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
        <h2 style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:22px;color:#141414;text-align:center;margin:16px 0 6px;letter-spacing:-.4px")}>
          Did the payment go through?
        </h2>
        <p style={css('font-size:13.5px;color:#75705F;text-align:center;margin:0 8px 20px;line-height:1.5')}>
          We recorded ₹{V.amountDisplay} to {V.payeeName}. Confirm so we keep it in your history.
        </p>
        <div style={css('background:#fff;border:1px solid #EBE6D9;border-radius:16px;padding:14px 16px;display:flex;align-items:center;gap:13px;margin-bottom:22px')}>
          <span
            style={css(
              "width:42px;height:42px;border-radius:13px;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px",
            )}
          >
            {V.payeeInitials}
          </span>
          <div style={css('flex:1')}>
            <div style={css('font-size:14px;font-weight:500;color:#20201C')}>{V.payeeName}</div>
            <div style={css('font-size:11.5px;color:#989282;margin-top:2px')}>{V.payeeUpi}</div>
          </div>
          <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;color:#141414")}>-₹{V.amountDisplay}</div>
        </div>
        <div style={css('display:flex;gap:12px')}>
          <button
            onClick={V.confirmNo}
            style={css("flex:1;border:1.5px solid #D8B4BC;background:none;color:#C0455B;height:54px;border-radius:16px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;cursor:pointer")}
          >
            No, it failed
          </button>
          <button
            onClick={V.confirmYes}
            style={css("flex:1.3;border:none;background:#141414;color:#fff;height:54px;border-radius:16px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;cursor:pointer")}
          >
            Yes, it's done
          </button>
        </div>
      </div>
    </div>
  );
}
