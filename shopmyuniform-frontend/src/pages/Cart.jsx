import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, refreshCart, updateItem, removeItem, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const items = cart.items || [];

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-navy">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-navy/20 py-16 text-center">
          <p className="text-navy/60">Your cart is empty.</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 divide-y divide-navy/10 rounded-lg border border-navy/10 bg-white">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-4">
                <div className="h-16 w-16 flex-shrink-0 rounded-md bg-navy/5" />
                <div className="flex-1">
                  <p className="font-medium text-navy">{item.product?.name}</p>
                  <p className="text-xs text-navy/50">Size: {item.size}</p>
                  <p className="text-sm font-semibold text-navy">₹{item.priceAtAdd}</p>
                </div>
                <div className="flex items-center rounded-md border border-navy/20">
                  <button onClick={() => updateItem(item._id, item.quantity - 1)} className="px-2.5 py-1.5 text-navy">
                    −
                  </button>
                  <span className="w-7 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateItem(item._id, item.quantity + 1)} className="px-2.5 py-1.5 text-navy">
                    +
                  </button>
                </div>
                <button onClick={() => removeItem(item._id)} className="text-sm text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg bg-navy/5 px-5 py-4">
            <span className="font-medium text-navy">Total</span>
            <span className="font-display text-xl font-semibold text-navy">₹{total}</span>
          </div>

          <button onClick={() => navigate("/checkout")} className="btn-primary mt-6 w-full">
            Proceed to checkout
          </button>
        </>
      )}
    </div>
  );
}
