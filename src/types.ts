export type Screen =
  | 'onboard'
  | 'auth'
  | 'login'
  | 'signup'
  | 'home'
  | 'scan'
  | 'upi'
  | 'amount'
  | 'gpay'
  | 'confirm'
  | 'receipt'
  | 'history'
  | 'budgets'
  | 'profile';

export type BudgetIconKey =
  | 'food'
  | 'shop'
  | 'transit'
  | 'bills'
  | 'fun'
  | 'health'
  | 'home'
  | 'misc';

export interface Txn {
  id: string;
  name: string;
  sub: string;
  raw: number;
  amt: string;
  dir: 1 | -1;
  time: string;
  budgetId: string | null;
  pending?: boolean;
  upi?: string;
  initials?: string;
}

export interface Budget {
  id: string;
  name: string;
  allocated: number;
  icon: BudgetIconKey;
}

export interface User {
  name: string;
  phone: string;
  email: string;
  bank: string;
}

export interface Payee {
  name: string;
  upi: string;
  initials: string;
}

export interface EasyPayState {
  screen: Screen;
  isAuthenticated: boolean;
  onboardIndex: number;
  authMode: 'signup' | 'login';
  authPhone: string;
  suName: string;
  suEmail: string;
  suBank: string;
  user: User;
  balance: number;
  cameraFallback: boolean;
  upiValue: string;
  noteValue: string;
  amount: string;
  payee: Payee | null;
  gpayPhase: 'loading' | 'done';
  selectedBudgetId: string | null;
  showAddBalance: boolean;
  addAmount: string;
  showBudgetPicker: boolean;
  showCreateBudget: boolean;
  newBudgetName: string;
  newBudgetAmt: string;
  newBudgetIcon: BudgetIconKey;
  budgets: Budget[];
  txns: Txn[];
}
