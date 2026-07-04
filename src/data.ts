import type { Budget, EasyPayState, Txn, User } from './types';

export const initialBudgets: Budget[] = [
  { id: 'b1', name: 'Food & Dining', allocated: 6000, icon: 'food' },
  { id: 'b2', name: 'Shopping', allocated: 4000, icon: 'shop' },
  { id: 'b3', name: 'Transport', allocated: 2500, icon: 'transit' },
  { id: 'b4', name: 'Bills & Utilities', allocated: 3500, icon: 'bills' },
];

export const initialTxns: Txn[] = [
  { id: 't1', name: 'Rahul Sharma', sub: 'Dinner split', raw: 450, amt: '-₹450', dir: -1, time: 'Yesterday', budgetId: 'b1' },
  { id: 't2', name: 'Jio Recharge', sub: 'Mobile · Prepaid', raw: 239, amt: '-₹239', dir: -1, time: '2 Jul', budgetId: 'b4' },
  { id: 't3', name: 'Aisha Khan', sub: 'Received', raw: 1200, amt: '+₹1,200', dir: 1, time: '1 Jul', budgetId: null },
  { id: 't4', name: 'Metro Card', sub: 'Recharge', raw: 300, amt: '-₹300', dir: -1, time: '30 Jun', budgetId: 'b3' },
  { id: 't5', name: 'Zomato', sub: 'Lunch order', raw: 528, amt: '-₹528', dir: -1, time: '29 Jun', budgetId: 'b1' },
  { id: 't6', name: 'Myntra', sub: 'Sneakers', raw: 2199, amt: '-₹2,199', dir: -1, time: '27 Jun', budgetId: 'b2' },
];

export const onboardData = [
  { t: 'Pay anyone,\nin one scan.', b: 'Scan any UPI QR and send money instantly — no account numbers, no waiting.' },
  { t: 'Your money,\nfully in control.', b: 'Track every rupee. Confirm each payment yourself so your history stays honest.' },
  { t: 'Powered by\nthe apps you trust.', b: 'Pay through Google Pay over UPI, right from EasyPay. Fast, familiar, secure.' },
];

export const debugUser: User = {
  name: 'Test User',
  phone: '90000 00000',
  email: 'test.user@easypay.dev',
  bank: 'Demo Bank',
};

export const initialState: EasyPayState = {
  screen: 'onboard',
  isAuthenticated: false,
  onboardIndex: 0,
  authMode: 'signup',
  authPhone: '',
  suName: '',
  suEmail: '',
  suBank: '',
  user: { name: 'Arjun Mehta', phone: '98765 43210', email: 'arjun.mehta@gmail.com', bank: 'Axis Bank' },
  balance: 24580,
  cameraFallback: false,
  upiValue: '',
  noteValue: '',
  amount: '',
  payee: null,
  showConfirm: false,
  selectedBudgetId: null,
  showAddBalance: false,
  addAmount: '',
  showBudgetPicker: false,
  showCreateBudget: false,
  newBudgetName: '',
  newBudgetAmt: '',
  newBudgetIcon: 'food',
  budgets: initialBudgets,
  txns: initialTxns,
};
