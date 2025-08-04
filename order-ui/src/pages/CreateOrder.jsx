// File: src/pages/CreateOrder.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOrder } from '../services/api';

const CreateOrder = () => {
  const [customerName, setCustomerName] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!invoiceFile) {
      toast.error('Please upload an invoice file.');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Submitting order...');

    // We must use FormData when we are sending files
    const formData = new FormData();
    formData.append('customerName', customerName);
    formData.append('orderAmount', orderAmount);
    formData.append('invoiceFile', invoiceFile); // The key 'invoiceFile' must match the backend

    try {
      await createOrder(formData);
      toast.success('Order created successfully!', { id: loadingToast });
      navigate('/'); // Redirect to dashboard on success
    } catch (error) {
      toast.error('Failed to create order. Please try again.', { id: loadingToast });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Order</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="orderAmount" className="block text-sm font-medium text-gray-700">Order Amount (₹)</label>
          <input
            type="number"
            id="orderAmount"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
            required
            step="0.01"
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="invoiceFile" className="block text-sm font-medium text-gray-700">Invoice (PDF only)</label>
          <input
            type="file"
            id="invoiceFile"
            onChange={(e) => setInvoiceFile(e.target.files[0])}
            required
            accept="application/pdf"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;