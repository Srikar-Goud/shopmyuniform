import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const inStockSizes = product.sizes?.filter((s) => s.stock > 0).length || 0;

  return (
    <Link
      to={`/products/${product._id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-navy/5 text-navy/30 product-card">
    
        
        <img
  src={product.images?.[0]}
  alt={product.name}
  className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
/>
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
