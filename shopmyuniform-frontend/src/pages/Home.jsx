import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = ["Shirt", "Trousers", "Skirt", "Pinafore", "Tie", "Sweater", "Blazer", "Shoes", "PE Kit", "Accessory"];

export default function Home() {
  const { user } = useAuth();
  const [schools, setSchools] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ q: "", school: "", category: "" });

  useEffect(() => {
    api.get("/schools").then(({ data }) => setSchools(data.schools));
  }, []);

  // Default to the logged-in user's own school, if set.
  useEffect(() => {
    if (user?.school) {
      const schoolId = typeof user.school === "string" ? user.school : user.school._id;
      setFilters((f) => ({ ...f, school: schoolId }));
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.q) params.q = filters.q;
    if (filters.school) params.school = filters.school;
    if (filters.category) params.category = filters.category;

    api
      .get("/products", { params })
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 rounded-xl bg-navy px-6 py-8 text-cream sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-mustard">School Uniforms, Sorted</p>
        <h1 className="mt-2 max-w-lg font-display text-3xl font-semibold sm:text-4xl">
          Everything on the uniform list, in one order.
        </h1>
        <p className="mt-2 max-w-md text-sm text-cream/70">
          Pick a school, find the right size, and let our support chat handle the rest — including tracking your order.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          className="input-field"
          placeholder="Search products, e.g. 'white shirt'"
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />
        <select
          className="input-field sm:w-52"
          value={filters.school}
          onChange={(e) => setFilters({ ...filters, school: e.target.value })}
        >
          <option value="">All schools</option>
          {schools.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          className="input-field sm:w-44"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="py-16 text-center text-navy/50">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="py-16 text-center text-navy/50">No products match your filters yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
