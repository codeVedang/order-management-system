// File: src/pages/OrderDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/api'; // We need to create this function

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Gets the ':id' from the URL

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading order details...</p>;
  }

  if (!order) {
    return <p className="text-center text-red-500">Order not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-600 hover:underline mb-6 block">&larr; Back to Dashboard</Link>
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-sm font-semibold text-gray-500">Order ID</h2>
                    <p className="text-lg text-gray-800 font-mono">{order.orderId}</p>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-500">Customer Name</h2>
                    <p className="text-lg text-gray-800">{order.customerName}</p>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-500">Order Date</h2>
                    <p className="text-lg text-gray-800">{new Date(order.orderDate).toLocaleString()}</p>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-500">Order Amount</h2>
                    <p className="text-lg text-gray-800 font-bold">₹{order.orderAmount.toFixed(2)}</p>
                </div>
            </div>
            <div className="mt-8 border-t pt-6">
                <a href={order.invoiceFileUrl} target="_blank" rel="noopener noreferrer" 
                   className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                    Download Invoice PDF
                </a>
            </div>
        </div>
    </div>
  );
};

export default OrderDetail;
