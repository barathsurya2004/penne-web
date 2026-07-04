import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Amount(V: EasyPayVals) {
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;display:flex;flex-direction:column;padding:calc(20px + var(--safe-t)) 22px calc(26px + var(--safe-b))')}>
      <div style={css('display:flex;align-items:center;gap:14px;margin-top:6px')}>
        <button
          onClick={V.backFromAmount}
          style={css('width:40px;height:40px;border-radius:13px;background:#fff;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;cursor:pointer')}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;color:#141414")}>Payment</span>
      </div>

      <div style={css('display:flex;flex-direction:column;align-items:center;margin-top:18px')}>
        <div
          style={css(
            "width:64px;height:64px;border-radius:20px;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:22px",
          )}
        >
          {V.payeeInitials}
        </div>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:17px;color:#141414;margin-top:10px")}>{V.payeeName}</div>
        <div style={css('font-size:12.5px;color:#8A8577;margin-top:3px;display:flex;align-items:center;gap:5px')}>
          <span style={css('width:6px;height:6px;border-radius:50%;background:#7FBF9B')} />
          {V.payeeUpi}
        </div>
      </div>

      <div style={css('margin-top:24px;display:flex;flex-direction:column;align-items:center')}>
        <div style={css('display:flex;align-items:baseline;gap:5px;color:#141414')}>
          <span style={css("font-family:'IBM Plex Sans',sans-serif;font-size:28px;font-weight:500;line-height:1")}>₹</span>
          <span style={css(`font-family:'IBM Plex Sans',sans-serif;font-size:56px;font-weight:600;letter-spacing:-2px;line-height:1;color:${V.amountColor}`)}>
            {V.amountDisplay}
          </span>
        </div>
        <div style={css('margin-top:18px;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap')}>
          <div style={css('display:inline-flex;align-items:center;gap:7px;background:#fff;border:1px solid #EBE6D9;border-radius:99px;padding:9px 14px;height:38px')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 8h16M8 4l-2 4M16 4l2 4M6 8l1 11a1 1 0 001 1h8a1 1 0 001-1l1-11" stroke="#8A8577" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={V.noteValue}
              onChange={V.onNoteInput}
              placeholder="Add a note"
              style={css("border:none;outline:none;background:none;font-size:12.5px;color:#5B564A;width:82px;font-family:'Roboto',sans-serif")}
            />
          </div>
          <button
            onClick={V.openBudgetPicker}
            style={css('display:inline-flex;align-items:center;gap:7px;background:#fff;border:1px solid #EBE6D9;border-radius:99px;padding:9px 12px;height:38px;cursor:pointer;font-family:\'Roboto\',sans-serif')}
          >
            <span style={css(`width:7px;height:7px;border-radius:50%;background:${V.selBudgetDot};flex-shrink:0`)} />
            <span style={css('font-size:12.5px;color:#5B564A;max-width:96px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis')}>{V.selBudgetLabel}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#A29A86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {V.insufficientBalance && (
          <div style={css('margin-top:14px;font-size:12px;color:#C0455B;font-weight:500')}>Insufficient balance — max ₹{V.balanceFmt}</div>
        )}
      </div>

      <div style={css('flex:1;min-height:8px')} />

      <div style={css('display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-bottom:14px')}>
        {V.keys.map((k, i) => (
          <button
            key={i}
            onClick={k.onClick}
            style={css("border:none;background:none;height:52px;font-family:'IBM Plex Sans',sans-serif;font-size:23px;font-weight:500;color:#141414;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:14px")}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div
        key={V.slideBlockedTick}
        ref={V.trackRef}
        style={css(
          `position:relative;height:62px;border-radius:18px;background:${V.insufficientBalance ? '#B9B4A6' : '#141414'};overflow:hidden;user-select:none;touch-action:none;animation:${V.insufficientBalance ? 'ep-shake .4s ease both' : 'none'}`,
        )}
      >
        <div ref={V.fillRef} style={css('position:absolute;inset:0;width:62px;background:linear-gradient(90deg,#1a1a1a,#333);border-radius:18px')} />
        <div style={css('position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;color:rgba(255,255,255,.9);pointer-events:none;padding-left:34px')}>
          <span style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:14.5px")}>Slide to pay via</span>
          <span style={css('display:inline-flex;align-items:center;gap:5px;background:#fff;border-radius:99px;padding:4px 10px 4px 6px')}>
            {V.gpayLogo}
            <span style={css("font-size:12.5px;font-weight:600;color:#3c4043;font-family:'Roboto',sans-serif")}>Pay</span>
          </span>
        </div>
        <div
          ref={V.knobRef}
          onPointerDown={V.onSlideDown}
          style={css('position:absolute;top:5px;left:5px;width:52px;height:52px;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;cursor:grab;box-shadow:0 4px 12px rgba(0,0,0,.3);z-index:5')}
        >
          <span style={css('display:flex;animation:ep-hint 1.3s ease-in-out infinite')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h13M13 6l6 6-6 6" stroke="#141414" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
