import { useState } from 'react';
import { subscribe, cancel } from '../services/api';
import Swal from 'sweetalert2'

function SubscriptionForm({ funds, onSubscribe }) {
  const [selectedFund, setSelectedFund] = useState('');
  const [amount, setAmount] = useState('');
  const [notificationType, setNotificationType] = useState('email');

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (!selectedFund) {
      return Swal.fire({
        title: "Do you add some Fund ?",
        text: "Please select a Fund and amount",
        icon: "question"
      
      });
    }
    try {
      if (type === 'subscribe') {
        await subscribe(selectedFund, Number(amount), notificationType);
      } else {
        await cancel(selectedFund, Number(amount));
      }
      setSelectedFund('');
      setAmount('');
      onSubscribe();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your subscription has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: "Do you add a correct amount?",
        text: error.response.data.message,
        icon: "question"
      });
    }
  };

  return (
    <form className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Subscribe/Cancel Fund</h2>
      <div className="mb-2">
        <select
          value={selectedFund}
          onChange={(e) => setSelectedFund(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a fund</option>
          {funds.map((fund) => (
            <option key={fund._id} value={fund._id}>
              {fund.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <select
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          onClick={(e) => handleSubmit(e, 'subscribe')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Subscribe
        </button>
        <button
          onClick={(e) => handleSubmit(e, 'cancel')}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default SubscriptionForm;