import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => api.get(`/orders/${id}`).then(({ data }) => setOrder(data.order));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!order) return <p className="py-16 text-center text-navy/50">Loading...</p>;

  const canReturn = order.status === "Delivered";

  const submitReturn = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      await api.post(`/orders/${order._id}/return`, { reason });
      setMessage("Return/exchange request submitted.");
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy">Order {order.orderNumber}</h1>
        <span className="badge bg-navy/10 text-navy">{order.status}</span>
      </div>
      <p className="mt-1 text-sm text-navy/50">Placed on {new Date(order.createdAt).toLocaleString()}</p>

      <div className="mt-6 rounded-lg border border-navy/10 bg-white p-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between py-1.5 text-sm">
            <span className="text-navy/80">
              {item.name} ({item.size}) × {item.quantity}
            </span>
            <span className="font-medium text-navy">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-navy/10 pt-2 font-semibold text-navy">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-navy/10 bg-white p-4">
        <h2 className="font-display text-base font-semibold text-navy">Status history</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {order.statusHistory.map((s, i) => (
            <li key={i} className="flex justify-between text-navy/70">
              <span>{s.status}</span>
              <span className="text-navy/40">{new Date(s.at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        {order.expectedDeliveryDate && (
          <p className="mt-3 text-sm text-navy/60">
            Expected delivery: {new Date(order.expectedDeliveryDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {canReturn && (
        <form onSubmit={submitReturn} className="mt-6 rounded-lg border border-navy/10 bg-white p-4">
          <h2 className="font-display text-base font-semibold text-navy">Return / Exchange</h2>
          <textarea
            className="input-field mt-3"
            rows={2}
            placeholder="Reason (e.g. size doesn't fit)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button type="submit" disabled={submitting} className="btn-secondary mt-3">
            {submitting ? "Submitting..." : "Request return / exchange"}
          </button>
          {message && <p className="mt-2 text-sm text-navy/70">{message}</p>}
        </form>
      )}
    </div>
  );
}
