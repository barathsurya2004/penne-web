import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Budgets(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;overflow-y:auto;padding:calc(20px + var(--safe-t)) 0 106px')}>
      <div style={css('padding:8px 22px 0;display:flex;align-items:center;justify-content:space-between')}>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:24px;color:#141414;letter-spacing:-.5px")}>Budgets</div>
        <button
          onClick={V.openCreateBudget}
          style={css(
            "display:inline-flex;align-items:center;gap:6px;border:none;background:#141414;color:#fff;height:38px;padding:0 14px;border-radius:12px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13px;cursor:pointer",
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New
        </button>
      </div>
      <div style={css('margin:16px 18px 0;background:#141414;border-radius:24px;padding:20px 22px;color:#fff')}>
        <div style={css('display:flex;justify-content:space-between;align-items:flex-end')}>
          <div>
            <div style={css('font-size:12px;color:rgba(255,255,255,.55)')}>Spent of allocated</div>
            <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:26px;margin-top:5px;letter-spacing:-.6px")}>
              {V.totalSpentFmt} <span style={css('font-size:14px;color:rgba(255,255,255,.4);font-weight:400')}>/ {V.totalAllocatedFmt}</span>
            </div>
          </div>
          <div style={css('text-align:right')}>
            <div style={css('font-size:11px;color:rgba(255,255,255,.5)')}>Left</div>
            <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px")}>{V.totalLeftFmt}</div>
          </div>
        </div>
        <div style={css('margin-top:16px;height:8px;border-radius:99px;background:rgba(255,255,255,.14);overflow:hidden')}>
          <div style={css(`height:100%;width:${V.budgetsPct};background:#fff;border-radius:99px;transition:width .4s`)} />
        </div>
      </div>
      <div style={css("padding:22px 22px 6px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13px;color:#8A8577")}>Categories</div>
      <div style={css('padding:0 18px;display:flex;flex-direction:column;gap:10px')}>
        {V.budgetsList.map((b) => (
          <div key={b.id} style={css('background:#fff;border:1px solid #EBE6D9;border-radius:18px;padding:15px 16px')}>
            <div style={css('display:flex;align-items:center;gap:12px')}>
              <span style={css('width:42px;height:42px;border-radius:13px;background:#F4F1E8;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                {b.icon}
              </span>
              <div style={css('flex:1;min-width:0')}>
                <div style={css("font-size:14.5px;font-weight:500;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>{b.name}</div>
                <div style={css('font-size:11.5px;color:#8A8577;margin-top:2px')}>
                  {b.spent} of {b.allocated}
                </div>
              </div>
              <div style={css(`font-size:12px;font-weight:500;color:${b.remainColor};text-align:right;white-space:nowrap`)}>{b.remaining}</div>
            </div>
            <div style={css('margin-top:13px;height:7px;border-radius:99px;background:#EFEADD;overflow:hidden')}>
              <div style={css(`height:100%;width:${b.pctW};background:${b.barColor};border-radius:99px;transition:width .4s`)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
