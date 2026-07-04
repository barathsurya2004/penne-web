import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function GpayHandoff(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 30px')}>
      <div style={css("position:absolute;top:calc(20px + var(--safe-t));left:0;right:0;text-align:center;font-family:'Roboto',sans-serif")}>
        <span style={css('display:inline-flex;align-items:center;gap:7px;color:#5f6368;font-size:13px')}>{V.gpayLogo2} Google Pay</span>
      </div>
      {V.gpayLoading && (
        <div style={css('display:flex;flex-direction:column;align-items:center;gap:26px')}>
          <div style={css('position:relative;width:78px;height:78px')}>
            <div
              style={css(
                'position:absolute;inset:0;border-radius:50%;border:4px solid #eee;border-top-color:#4285F4;border-right-color:#EA4335;border-bottom-color:#FBBC04;border-left-color:#34A853;animation:ep-spin 1s linear infinite',
              )}
            />
          </div>
          <div style={css('text-align:center')}>
            <div style={css("font-family:'Roboto',sans-serif;font-size:16px;font-weight:500;color:#202124")}>Paying ₹{V.amountDisplay}</div>
            <div style={css('font-size:13px;color:#5f6368;margin-top:5px')}>
              to {V.payeeName} · {V.payeeUpi}
            </div>
          </div>
          <div style={css('font-size:12px;color:#9aa0a6')}>Do not close this screen…</div>
        </div>
      )}
      {V.gpayDone && (
        <>
          <div style={css('display:flex;flex-direction:column;align-items:center;gap:22px;animation:ep-pop .4s ease both')}>
            <div style={css('width:84px;height:84px;border-radius:50%;background:#E6F4EA;display:flex;align-items:center;justify-content:center')}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#34A853" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={css('text-align:center')}>
              <div style={css("font-family:'Roboto',sans-serif;font-size:18px;font-weight:500;color:#202124")}>₹{V.amountDisplay} sent</div>
              <div style={css('font-size:13px;color:#5f6368;margin-top:5px')}>via UPI · Google Pay</div>
            </div>
          </div>
          <button
            onClick={V.returnFromGpay}
            style={css(
              "position:absolute;bottom:calc(40px + var(--safe-b));left:30px;right:30px;border:none;background:#1a73e8;color:#fff;height:52px;border-radius:26px;font-family:'Roboto',sans-serif;font-weight:500;font-size:15px;cursor:pointer",
            )}
          >
            Return to EasyPay
          </button>
        </>
      )}
    </div>
  );
}
