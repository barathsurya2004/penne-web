import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function TransferPickerSheet(V: EasyPayVals) {
  if (!V.showTransferPicker) return null;

  // only show budgets that have enough remaining to cover the deficit, or show all but disable them
  const budgetsWithFunds = V.budgetsList.filter(b => {
    // b.remaining is formatted as "₹X left", we need raw numbers
    // But since we just want to allow transferring from pools with at least `obDeficit`
    // We can do it more cleanly by filtering in the hook or just parsing it here
    const num = parseInt(b.remaining.replace(/[^0-9]/g, ''));
    const isLeft = b.remaining.includes('left');
    return isLeft && num >= V.obDeficit;
  });

  return (
    <div style={css('position:absolute;inset:0;background:rgba(0,0,0,.4);z-index:110;display:flex;flex-direction:column;justify-content:flex-end')}>
      <div style={css('background:#F5F1E8;border-radius:24px 24px 0 0;padding:24px 22px calc(24px + var(--safe-b));animation:ep-slide-up .3s cubic-bezier(0.1,0.9,0.2,1);max-height:80dvh;display:flex;flex-direction:column')}>
        <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:20px')}>
          <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:20px;color:#141414")}>
            Transfer {V.obDeficitFmt}
          </div>
          <button
            onClick={V.obCancel}
            style={css('width:32px;height:32px;border-radius:16px;background:#EBE6D9;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#5B564A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div style={css('font-size:14px;color:#5B564A;margin-bottom:16px')}>
          Select a pool to transfer funds from:
        </div>

        <div style={css('flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px')}>
          {budgetsWithFunds.length === 0 ? (
            <div style={css('padding:20px;text-align:center;color:#8A8577;font-size:14px')}>
              No other pools have enough funds.
            </div>
          ) : (
            budgetsWithFunds.map(b => (
              <button
                key={b.id}
                onClick={() => V.obTransferFrom(b.id)}
                style={css('background:#fff;border:1px solid #EBE6D9;border-radius:16px;padding:16px;display:flex;align-items:center;gap:12px;cursor:pointer;text-align:left;width:100%')}
              >
                <span style={css('width:40px;height:40px;border-radius:12px;background:#F4F1E8;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                  {b.icon}
                </span>
                <div style={css('flex:1')}>
                  <div style={css("font-size:15px;font-weight:500;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>{b.name}</div>
                  <div style={css('font-size:12px;color:#8A8577;margin-top:2px')}>{b.remaining}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
