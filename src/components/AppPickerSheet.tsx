import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function AppPickerSheet(props: EasyPayVals) {
  if (!props.showAppPicker) return null;

  return (
    <div style={css('position:absolute;inset:0;z-index:200;display:flex;flex-direction:column;justify-content:flex-end')}>
      <div 
        style={css('position:absolute;inset:0;background:rgba(20,20,28,0.4);backdrop-filter:blur(2px)')} 
        onClick={props.closeAppPicker}
      />
      <div style={css('position:relative;background:#F5F1E8;border-radius:24px 24px 0 0;padding:24px;padding-bottom:calc(24px + env(safe-area-inset-bottom))')}>
        <div style={css('width:36px;height:4px;background:#DED8C8;border-radius:2px;margin:0 auto 24px')} />
        <h2 style={css('font-size:20px;font-weight:600;color:#141414;margin:0 0 16px;letter-spacing:-0.5px')}>
          Default payment app
        </h2>
        
        <div style={css('display:flex;flex-direction:column;gap:8px')}>
          {[
            { id: 'upi', label: 'Ask every time' },
            { id: 'gpay', label: 'Google Pay' },
            { id: 'phonepe', label: 'PhonePe' },
            { id: 'paytm', label: 'Paytm' },
          ].map(app => (
            <div 
              key={app.id}
              onClick={() => props.setDefaultPaymentApp(app.id as any)}
              style={css('display:flex;align-items:center;justify-content:space-between;padding:16px;background:#EBE6D9;border-radius:16px;border:2px solid ' + (props.defaultPaymentApp === app.id ? '#141414' : 'transparent'))}
            >
              <span style={css('font-size:16px;font-weight:500;color:#141414')}>{app.label}</span>
              <div style={css('width:20px;height:20px;border-radius:10px;border:2px solid ' + (props.defaultPaymentApp === app.id ? '#141414' : '#C9C2B1') + ';display:flex;align-items:center;justify-content:center')}>
                {props.defaultPaymentApp === app.id && <div style={css('width:10px;height:10px;border-radius:5px;background:#141414')} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
