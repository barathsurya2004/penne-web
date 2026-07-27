import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function OverFrozenSheet(V: EasyPayVals) {
  if (!V.showOverFrozen) return null;

  const budget = V.state.budgets.find((b: any) => b.id === V.overFrozenId);
  const name = budget?.name || 'Category';

  return (
    <div
      onClick={V.closeOverFrozen}
      style={css('position:absolute;inset:0;background:rgba(0,0,0,.4);z-index:110;display:flex;flex-direction:column;justify-content:flex-end')}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={css('background:#F5F1E8;border-radius:24px 24px 0 0;padding:24px 22px calc(24px + var(--safe-b));animation:ep-slide-up .3s cubic-bezier(0.1,0.9,0.2,1);display:flex;flex-direction:column;align-items:center;text-align:center')}
      >
        <div style={css('width:40px;height:4px;background:#DED8C8;border-radius:99px;margin-bottom:20px')} />
        
        <div style={css('width:56px;height:56px;border-radius:18px;background:#B7C9E2;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:16px')}>
          ❄️
        </div>

        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:22px;color:#141414;letter-spacing:-.5px;margin-bottom:8px")}>
          {name} is Frozen
        </div>
        
        <div style={css("font-size:14px;color:#5B564A;line-height:1.4;margin-bottom:24px;max-width:280px;font-family:'IBM Plex Sans',sans-serif")}>
          You explicitly froze this category to prevent spending. Are you sure you want to proceed with this payment?
        </div>

        <div style={css('display:flex;flex-direction:column;gap:12px;width:100%')}>
          <button
            onClick={V.overrideOverFrozen}
            style={css("height:52px;border-radius:14px;background:#141414;color:#fff;border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;cursor:pointer")}
          >
            Override & Pay
          </button>
          
          <button
            onClick={V.closeOverFrozen}
            style={css("height:52px;border-radius:14px;background:#EBE6D9;color:#5B564A;border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;cursor:pointer")}
          >
            Cancel Payment
          </button>
        </div>
      </div>
    </div>
  );
}
