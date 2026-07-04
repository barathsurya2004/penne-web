import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Home(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;overflow-y:auto;padding:calc(20px + var(--safe-t)) 0 106px')}>
      <div style={css('padding:6px 22px 0;display:flex;align-items:center;justify-content:space-between')}>
        <div>
          <div style={css('font-size:12.5px;color:#8A8577')}>Good evening</div>
          <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:19px;color:#141414;letter-spacing:-.3px")}>{V.userName}</div>
        </div>
        <button
          onClick={V.goProfile}
          style={css("width:44px;height:44px;border-radius:50%;background:#141414;color:#fff;border:none;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;cursor:pointer")}
        >
          {V.userInitials}
        </button>
      </div>

      <div style={css('margin:18px 18px 0;background:#141414;border-radius:26px;padding:22px 22px 18px;color:#fff;position:relative;overflow:hidden')}>
        <div style={css('position:absolute;right:-30px;top:-30px;width:150px;height:150px;border:1px solid rgba(255,255,255,.09);border-radius:50%')} />
        <div style={css('position:absolute;right:6px;top:6px;width:100px;height:100px;border:1px solid rgba(255,255,255,.07);border-radius:50%')} />
        <div style={css('font-size:12px;color:rgba(255,255,255,.55);letter-spacing:.3px')}>Available balance</div>
        <div style={css('display:flex;align-items:flex-end;gap:8px;margin-top:6px')}>
          <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:36px;letter-spacing:-1px")}>₹{V.balanceFmt}</div>
          <div style={css('font-size:12px;color:#7FC19B;margin-bottom:9px;font-weight:500')}>+2.4%</div>
        </div>
        <div style={css('display:flex;gap:10px;margin-top:18px')}>
          <button
            onClick={V.openScan}
            style={css("flex:1;border:none;background:#fff;color:#141414;height:42px;border-radius:13px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13.5px;display:flex;align-items:center;justify-content:center;gap:7px;cursor:pointer")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Scan &amp; Pay
          </button>
          <button
            onClick={V.openAddBalance}
            style={css('width:42px;border:none;background:rgba(255,255,255,.13);color:#fff;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;cursor:pointer')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div style={css('display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:22px 16px 4px')}>
        {V.actions.map((a, i) => (
          <button key={i} onClick={a.onClick} style={css('border:none;background:none;display:flex;flex-direction:column;align-items:center;gap:9px;padding:6px 0;cursor:pointer')}>
            <span style={css('width:52px;height:52px;border-radius:16px;background:#fff;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px -8px rgba(0,0,0,.25)')}>
              {a.icon}
            </span>
            <span style={css('font-size:11.5px;color:#5B564A;font-weight:500')}>{a.label}</span>
          </button>
        ))}
      </div>

      <div style={css('margin:16px 18px 0;background:#F3D3D8;border-radius:20px;padding:16px 18px;display:flex;align-items:center;gap:14px;overflow:hidden')}>
        <div style={css('flex:1')}>
          <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;color:#141414")}>Get 5% cashback</div>
          <div style={css('font-size:12px;color:#8A5560;margin-top:3px;line-height:1.4')}>On your first UPI scan this week</div>
        </div>
        <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="29" stroke="#141414" strokeWidth="1.3" />
          <path d="M22 34c2-9 8-13 14-11 3 8-2 15-11 15-2 0-3-1-3-4z" fill="#141414" />
          <path d="M30 22c0-3 3-6 7-5" stroke="#141414" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>

      <div style={css('padding:26px 22px 4px;display:flex;align-items:center;justify-content:space-between')}>
        <span style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414")}>Recent activity</span>
        <span onClick={V.goHistory} style={css('font-size:12px;color:#8A8577;cursor:pointer')}>
          See all
        </span>
      </div>
      <div style={css('padding:6px 18px 0;display:flex;flex-direction:column;gap:2px')}>
        {V.txns.map((t) => (
          <div key={t.id} style={css('display:flex;align-items:center;gap:13px;padding:12px 4px;opacity:' + t.op)}>
            <span
              style={css(
                `width:44px;height:44px;border-radius:14px;background:${t.avBg};color:${t.avFg};display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;flex-shrink:0`,
              )}
            >
              {t.initials}
            </span>
            <div style={css('flex:1;min-width:0')}>
              <div style={css('font-size:14px;font-weight:500;color:#20201C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis')}>{t.name}</div>
              <div style={css('font-size:11.5px;color:#989282;margin-top:2px')}>{t.sub}</div>
            </div>
            <div style={css('text-align:right')}>
              <div style={css(`font-family:'IBM Plex Sans',sans-serif;font-size:14.5px;font-weight:600;color:${t.amtColor}`)}>{t.amt}</div>
              <div style={css('font-size:10.5px;color:#A8A292;margin-top:2px')}>{t.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
