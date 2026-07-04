import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function History(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;overflow-y:auto;padding:calc(20px + var(--safe-t)) 0 106px')}>
      <div style={css('padding:8px 22px 0')}>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:24px;color:#141414;letter-spacing:-.5px")}>Transactions</div>
        <div style={css('margin-top:16px;display:flex;gap:12px')}>
          <div style={css('flex:1;background:#141414;border-radius:20px;padding:16px 18px;color:#fff')}>
            <div style={css('font-size:11.5px;color:rgba(255,255,255,.55)')}>Spent this month</div>
            <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:22px;margin-top:6px;letter-spacing:-.5px")}>{V.monthOutFmt}</div>
          </div>
          <div style={css('flex:1;background:#fff;border:1px solid #EBE6D9;border-radius:20px;padding:16px 18px')}>
            <div style={css('font-size:11.5px;color:#8A8577')}>Received</div>
            <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:22px;margin-top:6px;letter-spacing:-.5px;color:#2E7D52")}>
              {V.monthInFmt}
            </div>
          </div>
        </div>
      </div>
      <div style={css('padding:22px 22px 8px;display:flex;align-items:center;justify-content:space-between')}>
        <span style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13px;color:#8A8577")}>All activity</span>
        <span style={css('font-size:11.5px;color:#A8A292;display:inline-flex;align-items:center;gap:5px')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M7 12h10M10 18h4" stroke="#A8A292" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Filter
        </span>
      </div>
      <div style={css('margin:0 18px;background:#fff;border:1px solid #EBE6D9;border-radius:20px;overflow:hidden')}>
        {V.allTxns.map((t) => (
          <div key={t.id} style={css(`display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #F1EDE2;opacity:${t.op}`)}>
            <span
              style={css(
                `width:44px;height:44px;border-radius:14px;background:${t.avBg};color:${t.avFg};display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;flex-shrink:0`,
              )}
            >
              {t.initials}
            </span>
            <div style={css('flex:1;min-width:0')}>
              <div style={css('font-size:14px;font-weight:500;color:#20201C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis')}>{t.name}</div>
              <div style={css('display:flex;align-items:center;gap:7px;margin-top:5px;min-width:0')}>
                <span style={css(`font-size:10.5px;color:${t.tagColor};background:${t.tagBg};border-radius:6px;padding:2px 7px;white-space:nowrap;flex-shrink:0`)}>
                  {t.tag}
                </span>
                <span style={css('font-size:11px;color:#B4AE9E;white-space:nowrap')}>{t.time}</span>
              </div>
            </div>
            <div style={css(`font-family:'IBM Plex Sans',sans-serif;font-size:15px;font-weight:600;color:${t.amtColor};white-space:nowrap;flex-shrink:0`)}>
              {t.amt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
