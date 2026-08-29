import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      const firstInStock = data.product.sizes.find((s) => s.stock > 0);
      setSize(firstInStock?.label || "");
    });
  }, [id]);

  if (!product) return <p className="py-16 text-center text-navy/50">Loading...</p>;

  const selectedSize = product.sizes.find((s) => s.label === size);

  const handleAdd = async () => {
    if (!user) return navigate("/login");
    if (!selectedSize || selectedSize.stock < 1) return;
    setStatus("adding");
    try {
      await addToCart(product._id, size, qty);
      setStatus("added");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      setStatus(err.response?.data?.message || "error");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-xl bg-navy/5 text-navy/30">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="h-40 w-40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082M9.75 3.104a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.696L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 20.25a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-maroon">{product.category}</span>
          <h1 className="mt-1 font-display text-3xl font-semibold text-navy">{product.name}</h1>
          <p className="mt-1 text-sm text-navy/60">{product.school?.name}</p>
          <p className="mt-4 text-2xl font-semibold text-navy">₹{product.price}</p>
          <p className="mt-4 text-sm leading-relaxed text-navy/70">{product.description}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-navy/80">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  disabled={s.stock < 1}
                  onClick={() => setSize(s.label)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                    size === s.label ? "border-navy bg-navy text-cream" : "border-navy/20 text-navy/70 hover:border-navy/40"
                  } ${s.stock < 1 ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {product.sizeGuideNotes && <p className="mt-2 text-xs text-navy/50">{product.sizeGuideNotes}</p>}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-navy/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-navy">
                −
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-navy">
                +
              </button>
            </div>
            <button onClick={handleAdd} disabled={!selectedSize || selectedSize.stock < 1} className="btn-primary flex-1">
              {status === "adding" ? "Adding..." : status === "added" ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>
          {status && status !== "adding" && status !== "added" && (
            <p className="mt-2 text-sm text-red-600">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
}
