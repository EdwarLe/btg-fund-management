import { useEffect, useState } from 'react';
import FundList from './components/FundList';
import SubscriptionForm from './components/SubscriptionForm';
import TransactionHistory from './components/TransactionHistory';
import { getFunds, getBalance } from './services/api';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

function App() {
  const [funds, setFunds] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isSideBar, setIsSideBar] = useState(false)
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isHistory, setIsHistory] = useState(false)

  useEffect(() => {
    fetchFunds();
    fetchBalance();
  }, []);

  const fetchFunds = async () => {
    const fetchedFunds = await getFunds();
    setFunds(fetchedFunds);
  };

  const fetchBalance = async () => {
    const fetchedBalance = await getBalance();
    setBalance(fetchedBalance);
  };

  return (
    <div className="mx-auto h-screen min-h-screen relative flex justify-center w-screen max-w-[1200px] bg-slate-100">
      <TopBar setIsSideBar={setIsSideBar}/>
      <div className='h-full relative w-full flex justify-center'>
          <SideBar 
            setIsSideBar={setIsSideBar}
            isSideBar={isSideBar}
            setIsSubscribe={setIsSubscribe}
            setIsHistory={setIsHistory}/>
        <section className='p-4 pt-20 flex flex-col items-center sm:ml-32 '>
          <h1 className="text-3xl font-bold mb-4">BTG Pactual Fund Management</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Current Balance: COP ${balance.toLocaleString()}</h2>
          </div>
          <div className="">
            <div>
              {
                isSubscribe
                ? <SubscriptionForm funds={funds} onSubscribe={fetchBalance} />
                : isHistory 
                  ? <TransactionHistory onTransactionComplete={fetchBalance} />
                  : <FundList funds={funds} />
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;