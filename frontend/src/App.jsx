import { useEffect, useState } from 'react';
import FundList from './components/FundList';
import SubscriptionForm from './components/SubscriptionForm';
import TransactionHistory from './components/TransactionHistory';
import { getFunds, getBalance } from './services/api';

function App() {
  const [funds, setFunds] = useState([]);
  const [balance, setBalance] = useState(0);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BTG Pactual Fund Management</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Balance: COP ${balance.toLocaleString()}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FundList funds={funds} />
          <SubscriptionForm funds={funds} onSubscribe={fetchBalance} />
        </div>
        <TransactionHistory onTransactionComplete={fetchBalance} />
      </div>
    </div>
  );
}

export default App;