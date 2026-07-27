import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function CreateSubscriptionSheet(V: EasyPayVals) {
  if (!V.showCreateSubscription) return null;

  return (
    <div
      onClick={V.closeCreateSubscription}
      style={css('position:absolute;inset:0;background:rgba(0,0,0,.4);z-index:110;display:flex;flex-direction:column;justify-content:flex-end')}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={css('background:#F5F1E8;border-radius:24px 24px 0 0;padding:24px 22px calc(24px + var(--safe-b));animation:ep-slide-up .3s cubic-bezier(0.1,0.9,0.2,1);display:flex;flex-direction:column')}
      >
        <div style={css('display:flex;justify-content:center;margin-bottom:20px')}>
          <div style={css('width:40px;height:4px;background:#DED8C8;border-radius:99px')} />
        </div>

        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:20px;color:#141414;margin-bottom:24px")}>
          New Subscription
        </div>

        <div style={css('margin-bottom:16px')}>
          <div style={css('font-size:13px;color:#8A8577;margin-bottom:8px;font-weight:500')}>Name</div>
          <input
            autoFocus
            placeholder="e.g. Netflix"
            value={V.newSubName}
            onChange={V.onNewSubName}
            style={css("width:100%;height:52px;background:#fff;border:1px solid #EBE6D9;border-radius:14px;padding:0 16px;font-family:'IBM Plex Sans',sans-serif;font-size:16px;color:#141414;outline:none")}
          />
        </div>

        <div style={css('margin-bottom:16px')}>
          <div style={css('font-size:13px;color:#8A8577;margin-bottom:8px;font-weight:500')}>Icon</div>
          <input
            placeholder="e.g. 🍿"
            value={V.newSubIcon}
            onChange={V.onNewSubIcon}
            style={css("width:100%;height:52px;background:#fff;border:1px solid #EBE6D9;border-radius:14px;padding:0 16px;font-family:'IBM Plex Sans',sans-serif;font-size:16px;color:#141414;outline:none")}
          />
        </div>

        <div style={css('margin-bottom:16px')}>
          <div style={css('font-size:13px;color:#8A8577;margin-bottom:8px;font-weight:500')}>Amount (₹)</div>
          <input
            type="number"
            placeholder="e.g. 199"
            value={V.newSubAmount}
            onChange={V.onNewSubAmount}
            style={css("width:100%;height:52px;background:#fff;border:1px solid #EBE6D9;border-radius:14px;padding:0 16px;font-family:'IBM Plex Sans',sans-serif;font-size:16px;color:#141414;outline:none")}
          />
        </div>

        <div style={css('margin-bottom:24px')}>
          <div style={css('font-size:13px;color:#8A8577;margin-bottom:8px;font-weight:500')}>Cadence</div>
          <select
            value={V.newSubCadenceType}
            onChange={V.onNewSubCadenceType}
            style={css("width:100%;height:52px;background:#fff;border:1px solid #EBE6D9;border-radius:14px;padding:0 16px;font-family:'IBM Plex Sans',sans-serif;font-size:16px;color:#141414;outline:none;appearance:none")}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>
          
          {V.newSubCadenceType === 'custom' && (
            <div style={css('display:flex;gap:12px;margin-top:12px')}>
              <div style={css('flex:1;display:flex;align-items:center;gap:8px')}>
                <span style={css('font-size:14px;color:#5B564A')}>Every</span>
                <input
                  type="number"
                  value={V.newSubCadenceInterval}
                  onChange={V.onNewSubCadenceInterval}
                  style={css("flex:1;height:44px;background:#fff;border:1px solid #EBE6D9;border-radius:12px;padding:0 12px;font-family:'IBM Plex Sans',sans-serif;font-size:15px;color:#141414;outline:none;text-align:center")}
                />
              </div>
              <div style={css('flex:1')}>
                <select
                  value={V.newSubCadenceUnit}
                  onChange={V.onNewSubCadenceUnit}
                  style={css("width:100%;height:44px;background:#fff;border:1px solid #EBE6D9;border-radius:12px;padding:0 12px;font-family:'IBM Plex Sans',sans-serif;font-size:15px;color:#141414;outline:none;appearance:none")}
                >
                  <option value="day">Day(s)</option>
                  <option value="week">Week(s)</option>
                  <option value="month">Month(s)</option>
                  <option value="year">Year(s)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div style={css('margin-top:12px;display:flex;gap:12px')}>
          <button
            onClick={V.closeCreateSubscription}
            style={css("flex:1;height:52px;border-radius:14px;background:#EBE6D9;color:#5B564A;border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;cursor:pointer")}
          >
            Cancel
          </button>
          <button
            onClick={V.createSubscription}
            disabled={V.createSubscriptionDisabled}
            style={css(`flex:1;height:52px;border-radius:14px;background:${V.createSubscriptionBtnBg};color:${V.createSubscriptionBtnFg};border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:16px;cursor:pointer;transition:all .2s`)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
