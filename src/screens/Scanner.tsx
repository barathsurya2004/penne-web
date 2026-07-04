import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Scanner(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#0C0C0C;overflow:hidden')}>
      <video
        ref={V.videoRef}
        autoPlay
        playsInline
        muted
        style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:${V.videoOpacity};transition:opacity .4s`)}
      />
      {V.cameraFallback && (
        <>
          <div style={css('position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 30%,#2b2b2b,#0b0b0b)')} />
          <div
            style={css(
              'position:absolute;top:34%;left:50%;transform:translate(-50%,-50%);width:150px;height:150px;background:#fff;border-radius:14px;display:grid;grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(7,1fr);gap:3px;padding:12px;opacity:.9',
            )}
          >
            {V.qrArt}
          </div>
        </>
      )}
      <div style={css('position:absolute;inset:0;background:linear-gradient(#0009,transparent 22%,transparent 62%,#000c)')} />
      <div style={css('position:absolute;top:calc(20px + var(--safe-t));left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:0 22px;z-index:20')}>
        <button
          onClick={V.goHome}
          style={css('width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.16);backdrop-filter:blur(6px);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={css("color:#fff;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px")}>Scan QR to pay</span>
        <div style={css('width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center')}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M7 4a4 4 0 018 0v2M5 10h14l-1 9a2 2 0 01-2 2H8a2 2 0 01-2-2l-1-9z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12 10v0" stroke="#fff" strokeWidth="2" />
          </svg>
        </div>
      </div>
      {(() => {
        const cornerColor = V.scanSuccess ? '#7FC19B' : V.scanError ? '#E27878' : '#fff';
        const reticleAnim = V.scanSuccess ? 'ep-pop .45s ease both' : V.scanError ? 'ep-shake .4s ease both' : 'none';
        return (
          <div
            key={V.scanTick}
            style={css(`position:absolute;top:34%;left:50%;transform:translate(-50%,-50%);width:236px;height:236px;z-index:15;animation:${reticleAnim}`)}
          >
            <div style={css('position:absolute;inset:0;overflow:hidden;border-radius:24px')}>
              {!V.scanSuccess && (
                <div style={css('position:absolute;left:6%;right:6%;height:2px;background:linear-gradient(90deg,transparent,#7FC19B,transparent);box-shadow:0 0 14px 2px #7FC19B;animation:ep-scanline 2.4s ease-in-out infinite')} />
              )}
            </div>
            <span style={css(`position:absolute;top:0;left:0;width:34px;height:34px;border-top:3px solid ${cornerColor};border-left:3px solid ${cornerColor};border-radius:16px 0 0 0;transition:border-color .2s`)} />
            <span style={css(`position:absolute;top:0;right:0;width:34px;height:34px;border-top:3px solid ${cornerColor};border-right:3px solid ${cornerColor};border-radius:0 16px 0 0;transition:border-color .2s`)} />
            <span style={css(`position:absolute;bottom:0;left:0;width:34px;height:34px;border-bottom:3px solid ${cornerColor};border-left:3px solid ${cornerColor};border-radius:0 0 0 16px;transition:border-color .2s`)} />
            <span style={css(`position:absolute;bottom:0;right:0;width:34px;height:34px;border-bottom:3px solid ${cornerColor};border-right:3px solid ${cornerColor};border-radius:0 0 16px 0;transition:border-color .2s`)} />
            {V.scanSuccess && (
              <div style={css('position:absolute;inset:0;display:flex;align-items:center;justify-content:center')}>
                <div style={css('width:64px;height:64px;border-radius:50%;background:#7FC19B;display:flex;align-items:center;justify-content:center;animation:ep-pop .4s ease both')}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        );
      })()}
      <div
        style={css(
          `position:absolute;top:calc(34% + 140px);left:0;right:0;text-align:center;color:${V.scanSuccess ? '#7FC19B' : V.scanError ? '#E27878' : 'rgba(255,255,255,.7)'};font-size:12.5px;z-index:15;animation:${V.scanSuccess ? 'none' : 'ep-pulse 1.6s infinite'};font-weight:${V.scanSuccess ? 600 : 400}`,
        )}
      >
        {V.scanHint}
      </div>

      <div style={css('position:absolute;bottom:0;left:0;right:0;background:#F5F1E8;border-radius:26px 26px 0 0;padding:22px 22px calc(30px + var(--safe-b));z-index:20')}>
        <div style={css('display:flex;gap:12px;margin-bottom:16px')}>
          <div style={css('flex:1;display:flex;align-items:center;gap:10px;padding:12px 14px;background:#fff;border:1px solid #EBE6D9;border-radius:15px')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="3" stroke="#141414" strokeWidth="1.5" />
              <path d="M8 12h8M12 8v8" stroke="#141414" strokeWidth="1.5" />
            </svg>
            <span style={css('font-size:12.5px;color:#5B564A;font-weight:500;line-height:1.3')}>
              Upload from
              <br />
              gallery
            </span>
          </div>
          <div style={css('flex:1;display:flex;align-items:center;gap:10px;padding:12px 14px;background:#fff;border:1px solid #EBE6D9;border-radius:15px')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="#141414" strokeWidth="1.5" />
              <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="#141414" strokeWidth="1.5" />
              <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="#141414" strokeWidth="1.5" />
              <path d="M13 16h7M16 13v7" stroke="#141414" strokeWidth="1.5" />
            </svg>
            <span style={css('font-size:12.5px;color:#5B564A;font-weight:500;line-height:1.3')}>
              My QR
              <br />
              code
            </span>
          </div>
        </div>
        <button
          onClick={V.switchToManual}
          style={css("width:100%;border:1.5px solid #141414;background:none;color:#141414;height:52px;border-radius:15px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer")}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Enter UPI ID or number
        </button>
      </div>
    </div>
  );
}
