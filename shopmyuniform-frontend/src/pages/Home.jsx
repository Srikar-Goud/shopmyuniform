import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";
import {
  IconSearch,
  IconSchool,
  IconRuler,
  IconHeadset,
  IconEmpty,
  IconShirt,
  IconTrousers,
  IconDress,
  IconTie,
  IconJacket,
  IconShoe,
  IconRun,
  IconBag,
} from "../components/Icons";

const CATEGORIES = [
  { name: "Shirts", value: "Shirt", Icon: IconShirt },
  { name: "Trousers", value: "Trousers", Icon: IconTrousers },
  { name: "Skirts", value: "Skirt", Icon: IconDress },
  { name: "Pinafores", value: "Pinafore", Icon: IconDress },
  { name: "Ties", value: "Tie", Icon: IconTie },
  { name: "Sweaters", value: "Sweater", Icon: IconJacket },
  { name: "Blazers", value: "Blazer", Icon: IconJacket },
  { name: "Shoes", value: "Shoes", Icon: IconShoe },
  { name: "PE Kits", value: "PE Kit", Icon: IconRun },
  { name: "Accessories", value: "Accessory", Icon: IconBag },
];

export default function Home() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [schools, setSchools] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    school: searchParams.get("school") || "",
    category: searchParams.get("category") || "",
  });

  useEffect(() => {
    api.get("/schools").then(({ data }) => setSchools(data.schools || []));
  }, []);

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
      .then(({ data }) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, [filters]);

  // React Router's client-side navigation does not trigger the browser's
  // native "scroll to #hash" behaviour, so links like /#categories or
  // /?category=Shoes#products (used by the navbar sidebar and footer)
  // need to be scrolled to manually whenever the hash changes.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => clearTimeout(timer);
  }, [location.hash, products]);

  const chooseCategory = (category) => {
    setFilters((f) => ({ ...f, category, q: "" }));
    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const chooseSchool = (schoolId) => {
    setFilters((f) => ({ ...f, school: schoolId, category: "", q: "" }));
    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative h-[420px] overflow-hidden sm:h-[480px]">
        <img
          src="/hero-uniforms.jpg"
          alt="Students wearing school uniforms"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/20" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-block rounded-sm bg-mustard px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy-dark">
              School uniforms made simple
            </span>

            <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Find your school.
              <br />
              <span className="text-mustard">Shop with confidence.</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
              Find the right uniform, choose the right size, and get everything your child needs in one place.
            </p>

            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary mt-6 !bg-mustard !text-navy-dark hover:!bg-mustard/90"
            >
              Shop Now
            </button>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/75">
              <span>School-specific products</span>
              <span>Size guidance</span>
              <span>AI customer support</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SEARCH BAR */}
      <section id="schools" className="relative z-10 -mt-8 px-5">
        <Reveal>
          <div className="mx-auto max-w-6xl rounded-lg bg-white p-4 shadow-lg">
            <div className="grid gap-3 md:grid-cols-[1fr_240px_200px]">
              <div className="relative">
                <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-dark/40" />
                <input
                  className="input-field pl-11"
                  placeholder="Search products, e.g. white shirt"
                  value={filters.q}
                  onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                />
              </div>

              <select
                className="input-field"
                value={filters.school}
                onChange={(e) => setFilters({ ...filters, school: e.target.value })}
              >
                <option value="">All schools</option>
                {schools.map((school) => (
                  <option key={school._id} value={school._id}>
                    {school.name}
                  </option>
                ))}
              </select>

              <select
                className="input-field"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All categories</option>
                {CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-8 text-center">
            <p className="section-label">Browse the collection</p>
            <h2 className="section-title">Shop by category</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {CATEGORIES.map((category, i) => (
            <Reveal key={category.value} delay={i * 40}>
              <button onClick={() => chooseCategory(category.value)} className="category-card group w-full">
                <span className="category-icon transition-transform duration-200 group-hover:scale-110">
                  <category.Icon className="h-7 w-7" />
                </span>
                <span className="mt-3 font-semibold text-navy-dark">{category.name}</span>
                <span className="mt-1 text-xs text-navy-dark/40">Shop now →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SCHOOL FINDER */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-8">
              <p className="section-label">School collection</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Find uniforms for your school
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/60">
                Select your school and we'll show you the uniforms available for it.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {schools.map((school, i) => (
              <Reveal key={school._id} delay={i * 60}>
                <button onClick={() => chooseSchool(school._id)} className="school-card group w-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mustard/15 text-mustard transition group-hover:scale-110">
                    <IconSchool className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-left font-semibold text-white">{school.name}</h3>
                  <p className="mt-1 text-left text-xs text-white/50">{school.address}</p>
                  <p className="mt-4 text-left text-xs font-semibold text-mustard">View uniforms →</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="section-label">Our collection</p>
              <h2 className="section-title">
                {filters.category ? `${filters.category} collection` : "Popular uniforms"}
              </h2>
            </div>
            <span className="rounded-full bg-navy/5 px-4 py-2 text-xs font-semibold text-navy-dark/60">
              {products.length} items
            </span>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="h-80 animate-pulse rounded-md bg-navy/5" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg bg-white py-20 text-center">
            <IconEmpty className="mx-auto h-12 w-12 text-navy-dark/20" />
            <h3 className="mt-4 font-semibold text-navy-dark">No products found</h3>
            <p className="mt-2 text-sm text-navy-dark/50">Try another school or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => (
              <Reveal key={product._id} delay={(i % 4) * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-navy/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
          <Reveal>
            <IconSchool className="h-7 w-7 text-navy" />
            <h3 className="mt-3 font-semibold text-navy-dark">School-specific</h3>
            <p className="mt-1 text-sm text-navy-dark/50">Find uniforms matched to your child's school.</p>
          </Reveal>
          <Reveal delay={80}>
            <IconRuler className="h-7 w-7 text-navy" />
            <h3 className="mt-3 font-semibold text-navy-dark">Size guidance</h3>
            <p className="mt-1 text-sm text-navy-dark/50">Choose confidently with practical size information.</p>
          </Reveal>
          <Reveal delay={160}>
            <IconHeadset className="h-7 w-7 text-navy" />
            <h3 className="mt-3 font-semibold text-navy-dark">AI support</h3>
            <p className="mt-1 text-sm text-navy-dark/50">Ask about products, sizing, orders, delivery and returns.</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}