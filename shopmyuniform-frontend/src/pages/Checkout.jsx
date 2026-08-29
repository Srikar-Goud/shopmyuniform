import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, refreshCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    line1: user?.address?.line1 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const items = cart.items || [];

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");
    try {
      const { data } = await api.post("/orders/checkout", { shippingAddress: address });
      await refreshCart();
      navigate(`/orders/${data.order.orderNumber}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return <p className="mx-auto max-w-2xl px-5 py-16 text-center text-navy/60">Your cart is empty.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-navy">Checkout</h1>

      <div className="mt-6 rounded-lg border border-navy/10 bg-white p-4">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between py-1.5 text-sm">
            <span className="text-navy/80">
              {item.product?.name} ({item.size}) × {item.quantity}
            </span>
            <span className="font-medium text-navy">₹{item.priceAtAdd * item.quantity}</span>
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-navy/10 pt-2 font-semibold text-navy">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <form onSubmit={placeOrder} className="mt-6 space-y-4 rounded-lg border border-navy/10 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Shipping address</h2>
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div>
          <label className="mb-1 block text-sm font-medium text-navy/80">Address line</label>
          <input required className="input-field" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy/80">City</label>
            <input required className="input-field" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy/80">State</label>
            <input required className="input-field" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy/80">Pincode</label>
          <input required className="input-field" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
        </div>
        <button type="submit" disabled={placing} className="btn-primary w-full">
          {placing ? "Placing order..." : `Place order · ₹${total}`}
        </button>
      </form>
    </div>
  );
}
