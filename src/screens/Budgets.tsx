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
        <div style={css('margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.1)')}>
          <div style={css('font-size:12px;color:rgba(255,255,255,.55)')}>Unallocated Funds</div>
          <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:22px;margin-top:2px")}>
            ₹{V.unallocatedFmt}
          </div>
        </div>
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
          <div
            key={b.id}
            onClick={() => V.openEditBudget(b.id)}
            style={css('background:#fff;border:1px solid #EBE6D9;border-radius:18px;padding:15px 16px;cursor:pointer')}
          >
            <div style={css('display:flex;align-items:center;gap:12px')}>
              <span style={css('width:42px;height:42px;border-radius:13px;background:#F4F1E8;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                {b.icon}
              </span>
              <div style={css('flex:1;min-width:0')}>
                <div style={css('display:flex;align-items:center;gap:6px')}>
                  <div style={css("font-size:14.5px;font-weight:500;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>{b.name}</div>
                  {b.frozen && <span style={css('font-size:11px')} title="Frozen">❄️</span>}
                </div>
                <div style={css('font-size:11.5px;color:#8A8577;margin-top:2px')}>
                  {b.spent} of {b.allocated}
                </div>
              </div>
              <div style={css(`font-size:12px;font-weight:500;color:${b.remainColor};text-align:right;white-space:nowrap`)}>
                {b.remaining}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  V.toggleFreezeBudget(b.id);
                }}
                style={css(`width:28px;height:28px;border-radius:9px;background:${b.frozen ? '#B7C9E2' : '#F4F1E8'};border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;margin-left:2px`)}
                title={b.frozen ? "Unfreeze" : "Freeze"}
              >
                <span style={css('font-size:12px')}>{b.frozen ? '❄️' : '🧊'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  V.deleteBudget(b.id);
                }}
                style={css('width:28px;height:28px;border-radius:9px;background:none;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;margin-left:2px')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0-1 13a1 1 0 01-1 1H8a1 1 0 01-1-1L6 7h12z" stroke="#C6BEA9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div style={css('margin-top:13px;height:7px;border-radius:99px;background:#EFEADD;overflow:hidden')}>
              <div style={css(`height:100%;width:${b.pctW};background:${b.barColor};border-radius:99px;transition:width .4s`)} />
            </div>
            {b.paceAlert && (
              <div style={css('margin-top:8px;font-size:11.5px;color:#C0455B;font-weight:500;display:flex;align-items:center;gap:4px')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b.paceAlert}
              </div>
            )}
            
            {V.isNearMonthEnd && b.remNum > 0 && (
              <div style={css('margin-top:12px;padding:12px;background:#F9F8F4;border-radius:12px;border:1px dashed #DED8C8')}>
                <div style={css('font-size:12px;color:#5B564A;font-weight:600;margin-bottom:8px')}>Month-end Suggestions</div>
                <div style={css('display:flex;flex-direction:column;gap:6px')}>
                  {V.wishlist.slice(0, 2).map(w => (
                    <button
                      key={w.id}
                      onClick={(e) => { e.stopPropagation(); V.moveLeftoverToWishlist(b.id, w.id); }}
                      style={css('background:#fff;border:1px solid #EBE6D9;border-radius:8px;padding:8px 10px;font-size:11.5px;color:#141414;font-weight:500;cursor:pointer;display:flex;justify-content:space-between;align-items:center')}
                    >
                      <span>Move to {w.name}</span>
                      <span style={css('color:#7A755F')}>+₹{b.remNum}</span>
                    </button>
                  ))}
                  <div style={css('text-align:center;font-size:11px;color:#8A8577;margin-top:2px')}>or Keep for rollover</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
