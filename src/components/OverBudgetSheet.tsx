import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function OverBudgetSheet(V: EasyPayVals) {
  if (!V.showOverBudget) return null;

  return (
    <div style={css('position:absolute;inset:0;background:rgba(0,0,0,.4);z-index:100;display:flex;flex-direction:column;justify-content:flex-end')}>
      <div style={css('background:#F5F1E8;border-radius:24px 24px 0 0;padding:24px 22px calc(24px + var(--safe-b));animation:ep-slide-up .3s cubic-bezier(0.1,0.9,0.2,1)')}>
        <div style={css('display:flex;justify-content:center;margin-bottom:20px')}>
          <div style={css('width:40px;height:4px;background:#DED8C8;border-radius:99px')} />
        </div>
        
        <div style={css('display:flex;align-items:center;justify-content:center;margin-bottom:16px')}>
          <div style={css('width:52px;height:52px;border-radius:16px;background:#FDECEE;color:#C0455B;display:flex;align-items:center;justify-content:center')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div style={css("text-align:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:20px;color:#141414")}>
          Over Budget
        </div>
        <div style={css('text-align:center;font-size:14px;color:#5B564A;margin-top:8px;line-height:1.5')}>
          You are short by <span style={css('font-weight:600;color:#C0455B')}>{V.obDeficitFmt}</span> in {V.selBudgetLabel}.
        </div>

        <div style={css('margin-top:24px;display:flex;flex-direction:column;gap:12px')}>
          <button
            onClick={V.obStartTransfer}
            style={css("height:52px;border-radius:14px;background:#141414;color:#fff;border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;cursor:pointer")}
          >
            Transfer from another pool
          </button>
          <button
            onClick={V.obOverride}
            style={css("height:52px;border-radius:14px;background:#EAE4D4;color:#141414;border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;cursor:pointer")}
          >
            Override and Pay
          </button>
          <button
            onClick={V.obCancel}
            style={css("height:52px;border-radius:14px;background:none;color:#5B564A;border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
