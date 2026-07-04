import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Onboarding(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;display:flex;flex-direction:column;padding:calc(30px + var(--safe-t)) 30px calc(34px + var(--safe-b))')}>
      <div style={css('display:flex;justify-content:space-between;align-items:center')}>
        <span style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:19px;letter-spacing:-.4px;color:#141414")}>
          easypay<span style={css('color:#C9455B')}>.</span>
        </span>
        <button onClick={V.goAuth} style={css("border:none;background:none;color:#8A8577;font-size:13px;font-family:'IBM Plex Sans',sans-serif;font-weight:500;cursor:pointer")}>
          Skip
        </button>
      </div>
      <div key={V.onboardKey} style={css('flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px')}>
        <div style={css('animation:ep-rise .5s ease both')}>{V.onboardArt}</div>
      </div>
      <div style={css('animation:ep-rise .5s .05s ease both')}>
        <h1 style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:30px;line-height:1.12;letter-spacing:-.8px;color:#141414;margin:0 0 12px;text-wrap:balance;white-space:pre-line")}>
          {V.onboardTitle}
        </h1>
        <p style={css('font-size:14.5px;line-height:1.55;color:#75705F;margin:0 40px 26px 0')}>{V.onboardBody}</p>
        <div style={css('display:flex;align-items:center;justify-content:space-between')}>
          <div style={css('display:flex;gap:7px')}>
            <span style={css(`width:${V.dot0w};height:7px;border-radius:99px;background:${V.dot0c};transition:.3s`)} />
            <span style={css(`width:${V.dot1w};height:7px;border-radius:99px;background:${V.dot1c};transition:.3s`)} />
            <span style={css(`width:${V.dot2w};height:7px;border-radius:99px;background:${V.dot2c};transition:.3s`)} />
          </div>
          <button
            onClick={V.nextOnboard}
            style={css('border:none;background:#141414;color:#fff;width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 12px 26px -8px rgba(0,0,0,.5)')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h13M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
