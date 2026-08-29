import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const STATUS_STYLES = {
  Placed: "bg-blue-100 text-blue-800",
  Processing: "bg-amber-100 text-amber-800",
  Shipped: "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-700",
  "Return Requested": "bg-orange-100 text-orange-800",
  Returned: "bg-gray-200 text-gray-700",
};

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.get("/orders/my-orders").then(({ data }) => setOrders(data.orders));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-navy">My orders</h1>

      {orders === null ? (
        <p className="mt-8 text-navy/50">Loading...</p>
      ) : orders.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-navy/20 py-16 text-center">
          <p className="text-navy/60">No orders yet.</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 divide-y divide-navy/10 rounded-lg border border-navy/10 bg-white">
          {orders.map((o) => (
            <Link key={o._id} to={`/orders/${o.orderNumber}`} className="flex items-center justify-between p-4 hover:bg-navy/5">
              <div>
                <p className="font-semibold text-navy">{o.orderNumber}</p>
                <p className="text-xs text-navy/50">Placed {new Date(o.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-navy">₹{o.total}</p>
                <span className={`badge mt-1 ${STATUS_STYLES[o.status] || "bg-gray-100 text-gray-700"}`}>{o.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
