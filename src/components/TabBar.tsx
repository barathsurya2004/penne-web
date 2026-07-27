import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function TabBar(V: EasyPayVals) {
  if (!V.showTabBar) return null;
  return (
    <div
      style={css(
        'position:absolute;bottom:0;left:0;right:0;min-height:92px;background:linear-gradient(to top,#F5F1E8 62%,rgba(245,241,232,0));display:flex;align-items:flex-start;justify-content:space-around;padding:14px 22px calc(10px + var(--safe-b));z-index:40',
      )}
    >
      <button onClick={V.goHome} style={css(`border:none;background:none;display:flex;flex-direction:column;align-items:center;gap:4px;color:${V.navHomeC};font-size:10px;font-weight:500;cursor:pointer`)}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
          <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" fill={V.navHomeC} />
        </svg>
        Home
      </button>
      <button onClick={V.goHistory} style={css(`border:none;background:none;display:flex;flex-direction:column;align-items:center;gap:4px;color:${V.navHistC};font-size:10px;font-weight:500;cursor:pointer`)}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h10" stroke={V.navHistC} strokeWidth="1.9" strokeLinecap="round" />
        </svg>
        History
      </button>
      <button
        onClick={V.openScan}
        style={css('border:none;background:#141414;width:58px;height:58px;border-radius:20px;margin-top:-16px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 14px 26px -8px rgba(0,0,0,.5)')}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      </button>
      <button onClick={V.goBudgets} style={css(`border:none;background:none;display:flex;flex-direction:column;align-items:center;gap:4px;color:${V.navBudgC};font-size:10px;font-weight:500;cursor:pointer`)}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
          <path d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" stroke={V.navBudgC} strokeWidth="1.9" strokeLinejoin="round" />
          <path d="M13 3a8 8 0 018 8h-8V3z" stroke={V.navBudgC} strokeWidth="1.9" strokeLinejoin="round" />
        </svg>
        Budgets
      </button>
      <button onClick={V.goWishlist} style={css(`border:none;background:none;display:flex;flex-direction:column;align-items:center;gap:4px;color:${V.navWishC};font-size:10px;font-weight:500;cursor:pointer`)}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={V.navWishC} strokeWidth="1.9" strokeLinejoin="round" />
        </svg>
        Wishlist
      </button>
      <button onClick={V.goInsights} style={css(`border:none;background:none;display:flex;flex-direction:column;align-items:center;gap:4px;color:${V.navInsiC};font-size:10px;font-weight:500;cursor:pointer`)}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
          <path d="M21 21H3M4 18v-8m4 8V7m4 11V4m4 14v-6m4 6v-9" stroke={V.navInsiC} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Insights
      </button>
      <button onClick={V.goProfile} style={css(`border:none;background:none;display:flex;flex-direction:column;align-items:center;gap:4px;color:${V.navProfC};font-size:10px;font-weight:500;cursor:pointer`)}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke={V.navProfC} strokeWidth="1.9" />
          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={V.navProfC} strokeWidth="1.9" strokeLinecap="round" />
        </svg>
        Profile
      </button>
    </div>
  );
}
