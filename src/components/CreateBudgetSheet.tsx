import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function CreateBudgetSheet(V: EasyPayVals) {
  if (!V.showCreateBudget) return null;
  return (
    <div
      onClick={V.closeCreateBudget}
      style={css('position:absolute;inset:0;background:rgba(20,20,20,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-end;z-index:80')}
    >
      <div onClick={V.stopProp} style={css('width:100%;background:#F5F1E8;border-radius:28px 28px 0 0;padding:24px 22px calc(30px + var(--safe-b));animation:ep-rise .32s ease both')}>
        <div style={css('width:44px;height:5px;border-radius:99px;background:#DAD4C4;margin:0 auto 20px')} />
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:20px;color:#141414;letter-spacing:-.4px")}>New budget</div>
        <div style={css('font-size:12.5px;color:#8A8577;margin-top:4px;margin-bottom:20px')}>Create a category and set how much you want to allow.</div>

        <label style={css('font-size:12px;color:#8A8577;font-weight:500')}>Category name</label>
        <input
          value={V.newBudgetName}
          onChange={V.onNewBudgetName}
          placeholder="e.g. Groceries"
          style={css("margin-top:8px;width:100%;background:#fff;border:1.5px solid #EBE6D9;border-radius:14px;padding:14px 16px;font-size:15px;color:#141414;outline:none;font-family:'Roboto',sans-serif")}
        />

        <label style={css('display:block;margin-top:16px;font-size:12px;color:#8A8577;font-weight:500')}>Monthly allocation</label>
        <div style={css('margin-top:8px;display:flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #EBE6D9;border-radius:14px;padding:0 16px')}>
          <span style={css("font-family:'IBM Plex Sans',sans-serif;font-size:18px;color:#141414;font-weight:500")}>₹</span>
          <input
            value={V.newBudgetAmt}
            onChange={V.onNewBudgetAmt}
            placeholder="5000"
            inputMode="numeric"
            style={css("flex:1;border:none;outline:none;background:none;font-size:17px;color:#141414;padding:14px 0;font-family:'IBM Plex Sans',sans-serif;font-weight:500")}
          />
        </div>

        <label style={css('display:block;margin-top:16px;font-size:12px;color:#8A8577;font-weight:500')}>Icon</label>
        <div style={css('margin-top:10px;display:flex;gap:10px;flex-wrap:wrap')}>
          {V.iconChoices.map((c) => (
            <button
              key={c.key}
              onClick={c.onClick}
              style={css(`width:46px;height:46px;border-radius:13px;background:${c.bg};border:1px solid #EBE6D9;display:flex;align-items:center;justify-content:center;cursor:pointer`)}
            >
              {c.glyph}
            </button>
          ))}
        </div>

        <button
          onClick={V.createBudget}
          disabled={V.createDisabled}
          style={css(`margin-top:24px;width:100%;height:56px;border:none;border-radius:16px;background:${V.createBtnBg};color:${V.createBtnFg};font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:.2s`)}
        >
          Create budget
        </button>
      </div>
    </div>
  );
}
