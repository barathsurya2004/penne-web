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
        <div style={css('display:flex;gap:6px')}>
          <button
            onClick={V.setHistoryFilterAll}
            style={css(
              `background:${V.historyFilter === 'all' ? '#141414' : '#fff'};color:${V.historyFilter === 'all' ? '#fff' : '#8A8577'};font-size:11px;font-weight:500;padding:6px 11px;border-radius:99px;cursor:pointer;border:1px solid ${V.historyFilter === 'all' ? '#141414' : '#EBE6D9'}`,
            )}
          >
            All
          </button>
          <button
            onClick={V.setHistoryFilterSent}
            style={css(
              `background:${V.historyFilter === 'sent' ? '#141414' : '#fff'};color:${V.historyFilter === 'sent' ? '#fff' : '#8A8577'};font-size:11px;font-weight:500;padding:6px 11px;border-radius:99px;cursor:pointer;border:1px solid ${V.historyFilter === 'sent' ? '#141414' : '#EBE6D9'}`,
            )}
          >
            Sent
          </button>
          <button
            onClick={V.setHistoryFilterReceived}
            style={css(
              `background:${V.historyFilter === 'received' ? '#141414' : '#fff'};color:${V.historyFilter === 'received' ? '#fff' : '#8A8577'};font-size:11px;font-weight:500;padding:6px 11px;border-radius:99px;cursor:pointer;border:1px solid ${V.historyFilter === 'received' ? '#141414' : '#EBE6D9'}`,
            )}
          >
            Received
          </button>
        </div>
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
        {V.allTxns.length === 0 && (
          <div style={css('padding:32px 20px;text-align:center;font-size:13px;color:#A8A292')}>
            No {V.historyFilter === 'sent' ? 'sent' : 'received'} transactions yet
          </div>
        )}
      </div>
    </div>
  );
}
