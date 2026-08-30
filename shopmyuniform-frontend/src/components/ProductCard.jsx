import { Link } from "react-router-dom";
import { IconShirt } from "./Icons";

export default function ProductCard({ product }) {
  const inStockSizes = product.sizes?.filter((s) => s.stock > 0).length || 0;
  const image = product.images?.[0];

  return (
    <Link
      to={`/products/${product._id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-navy/10 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="product-card flex aspect-[4/3] items-center justify-center overflow-hidden bg-cream text-navy/25">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <IconShirt className={`h-16 w-16 ${image ? "hidden" : "flex"}`} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-maroon">{product.category}</span>
        <h3 className="font-display text-base font-semibold leading-snug text-navy-dark group-hover:underline">
          {product.name}
        </h3>
        <p className="text-xs text-navy-dark/60">{product.school?.name}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold text-navy-dark">₹{product.price}</span>
          <span className={`badge ${inStockSizes > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
            {inStockSizes > 0 ? `${inStockSizes} sizes in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}