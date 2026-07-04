import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function BudgetPicker(V: EasyPayVals) {
  if (!V.showBudgetPicker) return null;
  return (
    <div
      onClick={V.closeBudgetPicker}
      style={css('position:absolute;inset:0;background:rgba(20,20,20,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-end;z-index:75')}
    >
      <div
        onClick={V.stopProp}
        style={css('width:100%;background:#F5F1E8;border-radius:28px 28px 0 0;padding:22px 20px calc(28px + var(--safe-b));animation:ep-rise .3s ease both;max-height:78%;display:flex;flex-direction:column')}
      >
        <div style={css('width:44px;height:5px;border-radius:99px;background:#DAD4C4;margin:0 auto 18px;flex-shrink:0')} />
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:17px;color:#141414;margin-bottom:4px")}>
          Attribute to a budget
        </div>
        <div style={css('font-size:12.5px;color:#8A8577;margin-bottom:16px')}>
          Track this payment against a category, or leave it in the unallocated pool.
        </div>
        <div style={css('overflow-y:auto;display:flex;flex-direction:column;gap:8px')}>
          {V.pickerOptions.map((o, i) => (
            <button
              key={i}
              onClick={o.onClick}
              style={css(`display:flex;align-items:center;gap:13px;padding:13px 14px;background:#fff;border:1.5px solid ${o.selBorder};border-radius:16px;cursor:pointer;text-align:left;width:100%`)}
            >
              <span style={css('width:40px;height:40px;border-radius:12px;background:#F4F1E8;border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                {o.icon}
              </span>
              <div style={css('flex:1;min-width:0')}>
                <div style={css("font-size:14px;font-weight:500;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>{o.name}</div>
                <div style={css('font-size:11.5px;color:#989282;margin-top:2px')}>{o.sub}</div>
              </div>
              {o.selected && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#141414" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
          <button
            onClick={V.pickerNewBudget}
            style={css('display:flex;align-items:center;gap:11px;padding:13px 14px;background:none;border:1.5px dashed #CFC8B7;border-radius:16px;cursor:pointer;text-align:left;width:100%;margin-top:2px')}
          >
            <span style={css('width:40px;height:40px;border-radius:12px;background:#141414;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span style={css("font-size:14px;font-weight:500;color:#141414;font-family:'IBM Plex Sans',sans-serif")}>Create a new budget</span>
          </button>
        </div>
      </div>
    </div>
  );
}
