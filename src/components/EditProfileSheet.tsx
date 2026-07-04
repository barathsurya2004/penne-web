import { css } from '../lib/style';
import { scrollFieldIntoView } from '../lib/dom';
import type { EasyPayVals } from '../hooks/useEasyPay';

const inputStyle = css(
  "margin-top:8px;width:100%;background:#fff;border:1.5px solid #EBE6D9;border-radius:14px;padding:14px 16px;font-size:16px;color:#141414;outline:none;font-family:'Roboto',sans-serif",
);

export function EditProfileSheet(V: EasyPayVals) {
  if (!V.showEditProfile) return null;
  return (
    <div
      onClick={V.closeEditProfile}
      style={css('position:absolute;inset:0;background:rgba(20,20,20,.55);backdrop-filter:blur(3px);display:flex;align-items:flex-end;z-index:80')}
    >
      <div
        onClick={V.stopProp}
        style={css('width:100%;background:#F5F1E8;border-radius:28px 28px 0 0;padding:24px 22px calc(30px + var(--safe-b));animation:ep-rise .32s ease both;max-height:82%;overflow-y:auto')}
      >
        <div style={css('width:44px;height:5px;border-radius:99px;background:#DAD4C4;margin:0 auto 20px')} />
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:20px;color:#141414;letter-spacing:-.4px")}>
          Edit personal details
        </div>
        <div style={css('font-size:12.5px;color:#8A8577;margin-top:4px;margin-bottom:18px')}>
          Just your profile info — we still never touch your bank or card credentials.
        </div>

        <label style={css('font-size:12px;color:#8A8577;font-weight:500')}>Full name</label>
        <input value={V.editName} onChange={V.onEditName} onFocus={scrollFieldIntoView} placeholder="e.g. Aditi Rao" style={inputStyle} />

        <label style={css('display:block;margin-top:16px;font-size:12px;color:#8A8577;font-weight:500')}>Mobile number</label>
        <div style={css('margin-top:8px;display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #EBE6D9;border-radius:14px;padding:0 16px')}>
          <span style={css("font-family:'IBM Plex Sans',sans-serif;font-size:15px;color:#141414;font-weight:500;padding-right:11px;border-right:1px solid #EBE6D9")}>
            +91
          </span>
          <input
            value={V.editPhone}
            onChange={V.onEditPhone}
            onFocus={scrollFieldIntoView}
            placeholder="98765 43210"
            inputMode="numeric"
            style={css("flex:1;border:none;outline:none;background:none;font-size:16px;color:#141414;padding:14px 0;font-family:'Roboto',sans-serif;letter-spacing:.5px")}
          />
        </div>

        <label style={css('display:block;margin-top:16px;font-size:12px;color:#8A8577;font-weight:500')}>
          Email <span style={css('color:#B4AE9E;font-weight:400')}>· optional</span>
        </label>
        <input
          value={V.editEmail}
          onChange={V.onEditEmail}
          onFocus={scrollFieldIntoView}
          placeholder="you@email.com"
          inputMode="email"
          style={inputStyle}
        />

        <label style={css('display:block;margin-top:16px;font-size:12px;color:#8A8577;font-weight:500')}>
          Bank name <span style={css('color:#B4AE9E;font-weight:400')}>· optional</span>
        </label>
        <input value={V.editBank} onChange={V.onEditBank} onFocus={scrollFieldIntoView} placeholder="e.g. HDFC Bank" style={inputStyle} />

        <button
          onClick={V.saveEditProfile}
          disabled={V.saveEditProfileDisabled}
          style={css(
            `margin-top:24px;width:100%;height:56px;border:none;border-radius:16px;background:${V.saveEditProfileDisabled ? '#DED8C8' : '#141414'};color:${V.saveEditProfileDisabled ? '#A69F8C' : '#fff'};font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:.2s`,
          )}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
