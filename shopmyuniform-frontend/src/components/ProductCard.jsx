import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const inStockSizes = product.sizes?.filter((s) => s.stock > 0).length || 0;

  return (
    <Link
      to={`/products/${product._id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-navy/5 text-navy/30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-16 w-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082M9.75 3.104a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.696L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 20.25a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-maroon">{product.category}</span>
        <h3 className="font-display text-base font-semibold leading-snug text-navy group-hover:underline">
          {product.name}
        </h3>
        <p className="text-xs text-navy/60">{product.school?.name}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold text-navy">₹{product.price}</span>
          <span className={`badge ${inStockSizes > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
            {inStockSizes > 0 ? `${inStockSizes} sizes in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}
