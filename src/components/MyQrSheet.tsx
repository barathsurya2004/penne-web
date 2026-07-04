import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function MyQrSheet(V: EasyPayVals) {
  if (!V.showMyQr) return null;
  return (
    <div
      onClick={V.closeMyQr}
      style={css('position:absolute;inset:0;background:rgba(20,20,20,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-end;z-index:80')}
    >
      <div
        onClick={V.stopProp}
        style={css('width:100%;background:#F5F1E8;border-radius:28px 28px 0 0;padding:24px 22px calc(30px + var(--safe-b));animation:ep-rise .32s ease both;text-align:center')}
      >
        <div style={css('width:44px;height:5px;border-radius:99px;background:#DAD4C4;margin:0 auto 20px')} />
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:20px;color:#141414;letter-spacing:-.4px")}>My QR code</div>
        <div style={css('font-size:12.5px;color:#8A8577;margin-top:4px;margin-bottom:20px')}>
          Show this to anyone paying you — they scan, you get paid.
        </div>
        <div style={css('width:100%;display:flex;justify-content:center')}>
          <div style={css('background:#fff;border:1px solid #EBE6D9;border-radius:20px;padding:18px;display:inline-flex')}>
            {V.myQrDataUrl ? (
              <img src={V.myQrDataUrl} width={220} height={220} alt="Your UPI QR code" style={css('display:block;border-radius:6px')} />
            ) : (
              <div style={css('width:220px;height:220px;display:flex;align-items:center;justify-content:center;color:#B4AE9E;font-size:12px')}>
                Generating…
              </div>
            )}
          </div>
        </div>
        <div style={css("margin-top:16px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414")}>{V.userName}</div>
        <div style={css('font-size:12.5px;color:#8A8577;margin-top:2px')}>{V.myQrVpa}</div>
      </div>
    </div>
  );
}
