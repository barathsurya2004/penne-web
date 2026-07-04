import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Profile(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;overflow-y:auto;padding:calc(20px + var(--safe-t)) 0 106px')}>
      <div style={css("padding:8px 22px 0;font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:24px;color:#141414;letter-spacing:-.5px")}>Profile</div>
      <div style={css('margin:16px 18px 0;background:#fff;border:1px solid #EBE6D9;border-radius:22px;padding:20px;display:flex;align-items:center;gap:15px')}>
        <div
          style={css(
            "width:60px;height:60px;border-radius:20px;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:22px",
          )}
        >
          {V.userInitials}
        </div>
        <div style={css('flex:1;min-width:0')}>
          <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:18px;color:#141414")}>{V.userName}</div>
          <div style={css('font-size:12.5px;color:#8A8577;margin-top:3px;display:flex;align-items:center;gap:5px;min-width:0')}>
            <span style={css('width:6px;height:6px;border-radius:50%;background:#7FBF9B;flex-shrink:0')} />
            <span style={css('white-space:nowrap;overflow:hidden;text-overflow:ellipsis')}>{V.userSub}</span>
          </div>
        </div>
        <button
          onClick={V.openEditProfile}
          style={css('width:38px;height:38px;border-radius:12px;background:#F4F1E8;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;cursor:pointer')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 20h4l10-10-4-4L4 16v4z" stroke="#141414" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M13 6l4 4" stroke="#141414" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
      <div style={css("padding:22px 22px 6px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13px;color:#8A8577")}>Account</div>
      <div style={css('padding:0 18px')}>
        <div style={css('background:#fff;border:1px solid #EBE6D9;border-radius:18px;overflow:hidden')}>
          {V.profileRows.map((p, i) => (
            <button
              key={i}
              onClick={p.onClick}
              style={css(
                `display:flex;align-items:center;gap:14px;width:100%;padding:15px 16px;background:none;border:none;border-bottom:1px solid #F1EDE2;text-align:left;cursor:${p.onClick ? 'pointer' : 'default'}`,
              )}
            >
              <span style={css('width:36px;height:36px;border-radius:11px;background:#F4F1E8;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                {p.icon}
              </span>
              <div style={css('flex:1')}>
                <div style={css('font-size:14px;color:#20201C;font-weight:500')}>{p.label}</div>
                <div style={css('font-size:11.5px;color:#989282;margin-top:2px')}>{p.sub}</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="#C6BEA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div style={css('padding:18px')}>
        <button
          onClick={V.logout}
          style={css("width:100%;height:52px;border-radius:16px;border:1.5px solid #E2C4CB;background:none;color:#C0455B;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;cursor:pointer")}
        >
          Log out
        </button>
      </div>
      <div style={css("padding:6px 22px 6px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13px;color:#8A8577")}>Danger zone</div>
      <div style={css('padding:0 18px 18px')}>
        <button
          onClick={V.deleteAllData}
          style={css("width:100%;height:52px;border-radius:16px;border:none;background:#C0455B;color:#fff;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;cursor:pointer")}
        >
          Delete all data
        </button>
        <div style={css('text-align:center;font-size:11px;color:#B4AE9E;margin-top:14px')}>EasyPay · v2.4.1</div>
      </div>
    </div>
  );
}
