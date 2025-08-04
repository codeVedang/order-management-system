// File: src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../services/api';
import SalesChart from '../components/SalesChart';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders Dashboard</h1>
        <Link to="/create" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          + Create New Order
        </Link>
      </div>

      {/* Section 1: The Analytics Chart */}
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <SalesChart orders={orders} />
      </div>

      {/* Section 2: The Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.orderId}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500 font-mono">
                    <Link to={`/orders/${order.orderId}`} className="text-blue-600 hover:underline" title={order.orderId}>
                      {order.orderId.substring(0, 8)}...
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.customerName}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">₹{order.orderAmount.toFixed(2)}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <a href={order.invoiceFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      View Invoice
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No orders found. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
