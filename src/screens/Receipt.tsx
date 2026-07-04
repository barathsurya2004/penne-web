import { css } from '../lib/style';
import { GpayLogo2 } from '../lib/icons';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Receipt(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;overflow-y:auto;padding:calc(20px + var(--safe-t)) 22px calc(30px + var(--safe-b));display:flex;flex-direction:column')}>
      <div style={css('display:flex;flex-direction:column;align-items:center;margin-top:14px;animation:ep-rise .4s ease both')}>
        <div style={css('width:76px;height:76px;border-radius:24px;background:#141414;display:flex;align-items:center;justify-content:center;animation:ep-pop .5s ease both')}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:24px;color:#141414;margin-top:16px;letter-spacing:-.5px")}>
          Payment successful
        </div>
        <div style={css('font-size:13px;color:#8A8577;margin-top:4px')}>{V.receiptTime}</div>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:44px;color:#141414;letter-spacing:-1.5px;margin-top:16px")}>
          ₹{V.amountDisplay}
        </div>
      </div>
      <div style={css('margin-top:26px;background:#fff;border:1px solid #EBE6D9;border-radius:22px;overflow:hidden')}>
        <div style={css('padding:18px 20px;display:flex;align-items:center;gap:13px;border-bottom:1px dashed #E4DFD1')}>
          <span
            style={css(
              "width:44px;height:44px;border-radius:14px;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px",
            )}
          >
            {V.payeeInitials}
          </span>
          <div style={css('flex:1')}>
            <div style={css('font-size:14.5px;font-weight:500;color:#20201C')}>{V.payeeName}</div>
            <div style={css('font-size:11.5px;color:#989282;margin-top:2px')}>{V.payeeUpi}</div>
          </div>
        </div>
        <div style={css('padding:6px 20px 8px')}>
          {V.receiptRows.map((r, i) => (
            <div key={i} style={css('display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #F1EDE2')}>
              <span style={css('font-size:12.5px;color:#8A8577')}>{r.k}</span>
              <span style={css("font-size:12.5px;color:#20201C;font-weight:500;font-family:'IBM Plex Sans',sans-serif")}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={css('padding:14px 20px;display:flex;align-items:center;gap:8px;background:#FBF9F3')}>
          <span style={css("display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#5f6368;font-family:'Roboto',sans-serif")}>
            Paid via <GpayLogo2 /> Google Pay · UPI
          </span>
        </div>
      </div>
      <div style={css('flex:1;min-height:18px')} />
      <div style={css('display:flex;gap:12px')}>
        <button
          style={css(
            "flex:1;border:1.5px solid #141414;background:none;color:#141414;height:54px;border-radius:16px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer",
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M12 3v13M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Share
        </button>
        <button
          onClick={V.finishToHome}
          style={css("flex:1.3;border:none;background:#141414;color:#fff;height:54px;border-radius:16px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;cursor:pointer")}
        >
          Done
        </button>
      </div>
    </div>
  );
}
