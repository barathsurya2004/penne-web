import { useState } from 'react';
import { css } from '../lib/style';
import type { EasyPayVals } from '../hooks/useEasyPay';

export function Insights(V: EasyPayVals) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const todayDate = now.getDate();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay + 6) % 7; // Mon=0, Sun=6
  const totalCells = Math.ceil((daysInMonth + startOffset) / 7) * 7;
  return (
    <div style={css('position:absolute;inset:0;background:#F5F1E8;overflow-y:auto;padding:calc(20px + var(--safe-t)) 0 106px')}>
      <div style={css('padding:8px 22px 0;display:flex;align-items:center;justify-content:space-between')}>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:24px;color:#141414;letter-spacing:-.5px")}>Insights</div>
      </div>

      <div style={css("padding:22px 22px 6px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414")}>Calendar Heatmap</div>
      <div style={css('padding:0 18px')}>
        <div style={css('background:#fff;border:1px solid #EBE6D9;border-radius:20px;padding:16px')}>
          <div style={css('display:flex;justify-content:space-between;margin-bottom:12px;font-size:16px;color:#141414;font-weight:700')}>
            <span>{monthNames[month]} {year}</span>
          </div>
          <div style={css('display:flex;justify-content:space-between;margin-bottom:12px;font-size:12px;color:#8A8577;font-weight:600')}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} style={css('width:32px;text-align:center')}>{d}</div>
            ))}
          </div>
          <div style={css('display:flex;flex-wrap:wrap;gap:8px')}>
            {Array.from({ length: totalCells }).map((_, i) => {
              const day = i - startOffset + 1;
              const isDate = day > 0 && day <= daysInMonth;
              
              if (!isDate) {
                return <div key={i} style={css('width:calc(14.28% - 7px);aspect-ratio:1')} />;
              }

              // Mock calendar logic tied to day number
              const status = day === 3 || day === 12 || day === 25 ? 'red' 
                           : day === 7 || day === 14 ? 'yellow' 
                           : day === 2 || day === 8 || day === 15 || day === 20 || day === 22 ? 'blue'
                           : 'green';
                           
              const color = status === 'green' ? '#7FBF9B' 
                          : status === 'yellow' ? '#F3D060' 
                          : status === 'red' ? '#F9C2CB' 
                          : '#B7C9E2'; 

              const isToday = day === todayDate;
              const isSelected = day === selectedDay;
              const textCol = status === 'yellow' ? '#A88219' : (status === 'red' ? '#C0455B' : (status === 'green' ? '#3B7955' : '#577399'));
              const highlight = isSelected ? 'ring-2 ring-offset-1 ring-black' : (isToday ? 'border:2px solid #141414' : '');

              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  style={css(`width:calc(14.28% - 7px);aspect-ratio:1;border-radius:10px;background:${color};display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;position:relative;${highlight}; transition: transform 0.1s; ${isSelected ? 'transform:scale(1.1);z-index:2;' : ''}`)}
                >
                  <div style={css(`font-size:13px;font-weight:700;color:${textCol}`)}>{day}</div>
                  
                  {/* Mock indicators for income/bills */}
                  {day === 1 && <div style={css('width:4px;height:4px;border-radius:2px;background:#141414;position:absolute;bottom:4px')} />}
                  {day === 14 && <div style={css('width:4px;height:4px;border-radius:2px;background:#141414;position:absolute;bottom:4px')} />}
                </div>
              );
            })}
          </div>
          
          <div style={css('display:flex;justify-content:space-between;margin-top:16px;font-size:10px;font-weight:600;color:#8A8577')}>
            <div style={css('display:flex;align-items:center;gap:4px')}><span style={css('width:8px;height:8px;border-radius:3px;background:#7FBF9B')}></span>On track</div>
            <div style={css('display:flex;align-items:center;gap:4px')}><span style={css('width:8px;height:8px;border-radius:3px;background:#F3D060')}></span>Limit</div>
            <div style={css('display:flex;align-items:center;gap:4px')}><span style={css('width:8px;height:8px;border-radius:3px;background:#F9C2CB')}></span>Over</div>
            <div style={css('display:flex;align-items:center;gap:4px')}><span style={css('width:8px;height:8px;border-radius:3px;background:#B7C9E2')}></span>Zero</div>
          </div>
        </div>

        {selectedDay !== null && (
          <div style={css('margin-top:16px;background:#fff;border:1px solid #EBE6D9;border-radius:20px;padding:16px;animation:ep-slide-up .2s')}>
            <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414;margin-bottom:12px")}>
              Transactions on {monthNames[month]} {selectedDay}
            </div>
            {V.allTxns.slice(0, (selectedDay % 3) + 1).map((t, idx) => (
              <div key={idx} style={css(`display:flex;align-items:center;padding:10px 0;${idx !== 0 ? 'border-top:1px solid #F4F1E8' : ''}`)}>
                <div style={css('width:40px;height:40px;border-radius:12px;background:#F4F1E8;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:15px;color:#141414;margin-right:12px')}>
                  {t.initials || 'Tx'}
                </div>
                <div style={css('flex:1')}>
                  <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414")}>{t.name}</div>
                  <div style={css('font-size:12px;color:#8A8577;margin-top:2px')}>{t.sub || 'Payment'}</div>
                </div>
                <div style={css(`font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:${t.amt.includes('+') ? '#3B7955' : '#141414'}`)}>
                  {t.amt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={css("padding:22px 22px 6px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414")}>Merchant Memory</div>
      <div style={css('padding:0 18px;display:flex;flex-direction:column;gap:10px')}>
        {V.merchants.map(m => (
          <div key={m.id} style={css('background:#fff;border:1px solid #EBE6D9;border-radius:18px;padding:15px;display:flex;justify-content:space-between')}>
            <div>
              <div style={css("font-size:15px;font-weight:600;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>{m.name}</div>
              <div style={css('font-size:12px;color:#8A8577;margin-top:2px')}>{m.visits} visits this month</div>
            </div>
            <div style={css('text-align:right')}>
              <div style={css("font-size:14px;font-weight:600;color:#20201C;font-family:'IBM Plex Sans',sans-serif")}>₹{m.monthlyTotal}</div>
              <div style={css('font-size:11.5px;color:#8A8577;margin-top:2px')}>Avg: ₹{m.averageBill} {m.trend === 'up' ? '↗' : m.trend === 'down' ? '↘' : '→'}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={css('padding:22px 22px 6px;display:flex;align-items:center;justify-content:space-between')}>
        <div style={css("font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:15px;color:#141414")}>Subscription Radar</div>
        <button
          onClick={V.openCreateSubscription}
          style={css("display:inline-flex;align-items:center;gap:6px;border:none;background:#141414;color:#fff;height:32px;padding:0 12px;border-radius:10px;font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:12px;cursor:pointer")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New
        </button>
      </div>
      <div style={css('padding:0 18px;display:flex;flex-direction:column;gap:10px')}>
        {V.subscriptions.map(s => {
          let cadenceStr: string = s.cadence.type;
          if (s.cadence.type === 'custom') {
            cadenceStr = `Every ${s.cadence.interval} ${s.cadence.unit}(s)`;
          } else {
            cadenceStr = cadenceStr.charAt(0).toUpperCase() + cadenceStr.slice(1);
          }
          return (
            <div key={s.id} style={css(`background:${s.cancelSuggested ? '#FDECEE' : '#fff'};border:1px solid ${s.cancelSuggested ? '#F9C2CB' : '#EBE6D9'};border-radius:18px;padding:15px;display:flex;gap:14px`)}>
              <div style={css('width:42px;height:42px;border-radius:12px;background:#F4F1E8;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0')}>
                {s.icon || '💳'}
              </div>
              <div style={css('flex:1;min-width:0;display:flex;flex-direction:column')}>
                <div style={css('display:flex;justify-content:space-between;align-items:flex-start')}>
                  <div>
                    <div style={css(`font-size:15px;font-weight:600;color:${s.cancelSuggested ? '#C0455B' : '#20201C'};font-family:'IBM Plex Sans',sans-serif`)}>{s.name}</div>
                    <div style={css(`font-size:12px;color:${s.cancelSuggested ? '#C0455B' : '#8A8577'};margin-top:2px;opacity:0.8`)}>Used: {s.lastUsed}</div>
                  </div>
                  <div style={css('text-align:right')}>
                    <div style={css(`font-size:14px;font-weight:600;color:${s.cancelSuggested ? '#C0455B' : '#20201C'};font-family:'IBM Plex Sans',sans-serif`)}>₹{s.amount} <span style={css('font-weight:400;font-size:11px')}>/ {cadenceStr}</span></div>
                    <div style={css(`font-size:11.5px;color:${s.cancelSuggested ? '#C0455B' : '#8A8577'};margin-top:2px;opacity:0.8`)}>₹{s.annualCost}/yr</div>
                  </div>
                </div>
                {s.cancelSuggested && (
                  <div style={css('margin-top:10px;font-size:12px;font-weight:600;color:#C0455B;display:flex;align-items:center;gap:4px')}>
                    <span>⚠️ Consider cancelling</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
