import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Wishlist(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;overflow-y:auto;padding:calc(20px + var(--safe-t)) 0 106px')}>
      <div style={css('padding:8px 22px 0;display:flex;align-items:center;justify-content:space-between')}>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:24px;color:#141414;letter-spacing:-.5px")}>Intelligence</div>
      </div>

      <div style={css('margin:16px 18px 0;background:#141414;border-radius:24px;padding:20px 22px;color:#fff')}>
        <div style={css('display:flex;justify-content:space-between;align-items:flex-start')}>
          <div>
            <div style={css('font-size:12px;color:rgba(255,255,255,.55)')}>Unallocated Funds</div>
            <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:26px;margin-top:5px;letter-spacing:-.6px")}>
              ₹{V.unallocatedFmt}
            </div>
          </div>
          <button
            onClick={V.waterfallToWishlist}
            style={css("border:none;background:#fff;color:#141414;padding:8px 14px;border-radius:12px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13px;cursor:pointer")}
          >
            Waterfall to Wishlist
          </button>
        </div>
      </div>

      <div style={css("padding:22px 22px 6px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414")}>Wishlist System</div>
      <div style={css('padding:0 18px;display:flex;flex-direction:column;gap:12px')}>
        {V.wishlist.map(w => {
          const pct = Math.min(100, Math.round((w.currentAmt / w.targetAmt) * 100));
          return (
            <div key={w.id} style={css('background:#fff;border:1px solid #EBE6D9;border-radius:20px;padding:16px;display:flex;gap:14px')}>
              <div style={css(`width:64px;height:64px;border-radius:14px;background-color:#EBE6D9;background-image:url(${w.image});background-size:cover;background-position:center;flex-shrink:0`)} />
              <div style={css('flex:1;min-width:0')}>
                <div style={css('display:flex;justify-content:space-between;align-items:flex-start')}>
                  <div style={css("font-size:15px;font-weight:600;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>{w.name}</div>
                  <div style={css('font-size:11px;font-weight:700;background:#F4F1E8;color:#5B564A;padding:3px 6px;border-radius:6px')}>{w.priority}</div>
                </div>
                <div style={css('font-size:12px;color:#8A8577;margin-top:2px')}>Goal: ₹{w.targetAmt.toLocaleString()} • By {w.deadline}</div>
                <div style={css('display:flex;align-items:center;gap:10px;margin-top:10px')}>
                  <div style={css('flex:1;height:6px;border-radius:99px;background:#EFEADD;overflow:hidden')}>
                    <div style={css(`height:100%;width:${pct}%;background:#20201C;border-radius:99px;transition:width .4s`)} />
                  </div>
                  <div style={css('font-size:11.5px;font-weight:600;color:#20201C')}>{pct}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
