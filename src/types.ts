export type Screen =
  | 'onboard'
  | 'auth'
  | 'login'
  | 'signup'
  | 'home'
  | 'scan'
  | 'upi'
  | 'amount'
  | 'receipt'
  | 'history'
  | 'budgets'
  | 'wishlist'
  | 'insights'
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
  frozen?: boolean;
}

export interface WishlistItem {
  id: string;
  name: string;
  targetAmt: number;
  currentAmt: number;
  priority: 'P1' | 'P2' | 'P3';
  deadline: string;
  image: string;
}

export type CadenceUnit = 'day' | 'week' | 'month' | 'year';

export interface SubscriptionCadence {
  type: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'custom';
  interval?: number;
  unit?: CadenceUnit;
}

export interface Subscription {
  id: string;
  name: string;
  icon: string;
  amount: number;
  cadence: SubscriptionCadence;
  annualCost: number;
  lastUsed: string;
  cancelSuggested?: boolean;
}

export interface Merchant {
  id: string;
  name: string;
  visits: number;
  monthlyTotal: number;
  averageBill: number;
  trend: 'up' | 'down' | 'stable';
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
  mc?: string;
  tr?: string;
  extraParams?: Record<string, string>;
  rawStr?: string;
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
  isAmountFixed: boolean;
  payee: Payee | null;
  showConfirm: boolean;
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
  showEditProfile: boolean;
  editName: string;
  editPhone: string;
  editEmail: string;
  editBank: string;
  editingBudgetId: string | null;
  showMyQr: boolean;
  showOverBudget: boolean;
  showOverFrozen: boolean;
  overBudgetId: string | null;
  overFrozenId: string | null;
  obDeficit: number;
  showTransferPicker: boolean;
  wishlist: WishlistItem[];
  subscriptions: Subscription[];
  merchants: Merchant[];
  showCreateSubscription: boolean;
  newSubName: string;
  newSubIcon: string;
  newSubAmount: string;
  newSubCadenceType: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'custom';
  newSubCadenceInterval: string;
  newSubCadenceUnit: 'day' | 'week' | 'month' | 'year';
}
