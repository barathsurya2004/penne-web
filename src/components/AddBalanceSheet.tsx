import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function AddBalanceSheet(V: EasyPayVals) {
  if (!V.showAddBalance) return null;
  return (
    <div
      onClick={V.closeAddBalance}
      style={css('position:absolute;inset:0;background:rgba(20,20,20,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-end;z-index:80')}
    >
      <div onClick={V.stopProp} style={css('width:100%;background:#F5F1E8;border-radius:28px 28px 0 0;padding:24px 22px calc(30px + var(--safe-b));animation:ep-rise .32s ease both')}>
        <div style={css('width:44px;height:5px;border-radius:99px;background:#DAD4C4;margin:0 auto 20px')} />
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:20px;color:#141414;letter-spacing:-.4px")}>Add money</div>
        <div style={css('font-size:12.5px;color:#8A8577;margin-top:4px')}>Top up your EasyPay wallet from your linked bank account.</div>
        <div style={css('margin:22px 0 6px;display:flex;align-items:baseline;justify-content:center;gap:6px')}>
          <span style={css("font-family:'IBM Plex Sans',sans-serif;font-size:30px;font-weight:500;color:#141414")}>₹</span>
          <span style={css(`font-family:'IBM Plex Sans',sans-serif;font-size:52px;font-weight:600;letter-spacing:-2px;line-height:1;color:${V.addAmountColor}`)}>
            {V.addAmountDisplay}
          </span>
        </div>
        <input
          value={V.addAmount}
          onChange={V.onAddAmount}
          placeholder="Enter amount"
          inputMode="numeric"
          style={css("width:100%;text-align:center;background:none;border:none;border-bottom:1.5px solid #E4DFD1;outline:none;font-size:14px;color:#5B564A;padding:8px 0 12px;font-family:'Roboto',sans-serif")}
        />
        <div style={css('display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:18px')}>
          {V.addChips.map((c, i) => (
            <button
              key={i}
              onClick={c.onClick}
              style={css("border:1px solid #E4DFD1;background:#fff;color:#20201C;height:44px;border-radius:13px;font-size:13px;font-weight:500;font-family:'IBM Plex Sans',sans-serif;cursor:pointer")}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div style={css('margin-top:18px;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #EBE6D9;border-radius:16px;padding:13px 15px')}>
          <span style={css('width:40px;height:40px;border-radius:12px;background:#F4F1E8;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 10l8-5 8 5M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div style={css('flex:1')}>
            <div style={css("font-size:13.5px;font-weight:500;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>Axis Bank</div>
            <div style={css('font-size:11.5px;color:#989282;margin-top:2px')}>Savings · ••4821</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="#C6BEA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <button
          onClick={V.confirmAddBalance}
          disabled={V.addDisabled}
          style={css(`margin-top:22px;width:100%;height:56px;border:none;border-radius:16px;background:${V.addBtnBg};color:${V.addBtnFg};font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:.2s`)}
        >
          Add money
        </button>
      </div>
    </div>
  );
}
