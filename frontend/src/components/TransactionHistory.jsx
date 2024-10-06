import { useEffect, useState } from 'react';
import { getTransactionHistory } from '../services/api';

function TransactionHistory({ onTransactionComplete }) {
  const [transactions,

 setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [onTransactionComplete]);

  const fetchTransactions = async () => {
    const fetchedTransactions = await getTransactionHistory();
    setTransactions(fetchedTransactions);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
      <ul className="list-disc pl-5">
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type === 'subscription' ? 'Subscribed to' : 'Cancelled from'}{' '}
            {transaction.fundId.name} - COP ${transaction.amount.toLocaleString()} on{' '}
            {new Date(transaction.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;