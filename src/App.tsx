import { css } from './lib/style';
import { useEasyPay } from './hooks/useEasyPay';
import { Onboarding } from './screens/Onboarding';
import { AuthLanding } from './screens/AuthLanding';
import { Login } from './screens/Login';
import { Signup } from './screens/Signup';
import { Home } from './screens/Home';
import { Scanner } from './screens/Scanner';
import { ManualUpi } from './screens/ManualUpi';
import { Amount } from './screens/Amount';
import { Confirm } from './screens/Confirm';
import { Receipt } from './screens/Receipt';
import { History } from './screens/History';
import { Budgets } from './screens/Budgets';
import { Profile } from './screens/Profile';
import { TabBar } from './components/TabBar';
import { BudgetPicker } from './components/BudgetPicker';
import { AddBalanceSheet } from './components/AddBalanceSheet';
import { CreateBudgetSheet } from './components/CreateBudgetSheet';
import { EditProfileSheet } from './components/EditProfileSheet';
import { MyQrSheet } from './components/MyQrSheet';

function App() {
  const V = useEasyPay();

  return (
    <div className="ep-shell" style={css('position:relative;width:100%;height:100dvh;background:#F5F1E8;overflow:hidden')}>
      {V.screenOnboard && <Onboarding {...V} />}
      {V.screenAuth && <AuthLanding {...V} />}
      {V.screenLogin && <Login {...V} />}
      {V.screenSignup && <Signup {...V} />}
      {V.screenHome && <Home {...V} />}
      {V.screenScan && <Scanner {...V} />}
      {V.screenUpi && <ManualUpi {...V} />}
      {V.screenAmount && <Amount {...V} />}
      {V.screenReceipt && <Receipt {...V} />}
      {V.screenHistory && <History {...V} />}
      {V.screenBudgets && <Budgets {...V} />}
      {V.screenProfile && <Profile {...V} />}

      <BudgetPicker {...V} />
      <AddBalanceSheet {...V} />
      <CreateBudgetSheet {...V} />
      <EditProfileSheet {...V} />
      <MyQrSheet {...V} />
      <Confirm {...V} />
      <TabBar {...V} />
    </div>
  );
}

export default App;
