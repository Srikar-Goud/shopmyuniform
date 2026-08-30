import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { name: "Shirts", value: "Shirt", icon: "👕" },
  { name: "Trousers", value: "Trousers", icon: "👖" },
  { name: "Skirts", value: "Skirt", icon: "🎀" },
  { name: "Pinafores", value: "Pinafore", icon: "👗" },
  { name: "Ties", value: "Tie", icon: "👔" },
  { name: "Sweaters", value: "Sweater", icon: "🧶" },
  { name: "Blazers", value: "Blazer", icon: "🧥" },
  { name: "Shoes", value: "Shoes", icon: "👟" },
  { name: "PE Kits", value: "PE Kit", icon: "🏃" },
  { name: "Accessories", value: "Accessory", icon: "🎒" },
];

export default function Home() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const [schools, setSchools] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
  q: searchParams.get("q") || "",
  school: searchParams.get("school") || "",
  category: searchParams.get("category") || "",
});

  useEffect(() => {
    api
      .get("/schools")
      .then(({ data }) => setSchools(data.schools || []));
  }, []);

  useEffect(() => {
    if (user?.school) {
      const schoolId =
        typeof user.school === "string"
          ? user.school
          : user.school._id;

      setFilters((f) => ({
        ...f,
        school: schoolId,
      }));
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

  const chooseCategory = (category) => {
    setFilters((f) => ({
      ...f,
      category,
      q: "",
    }));

    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const chooseSchool = (schoolId) => {
    setFilters((f) => ({
      ...f,
      school: schoolId,
      category: "",
      q: "",
    }));

    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="bg-cream">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative h-[520px] overflow-hidden sm:h-[600px]">

        <img
          src="/hero-uniforms.jpg"
          alt="Students wearing school uniforms"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">

          <div className="max-w-xl animate-fade-up">

            <span className="inline-block rounded-full bg-mustard px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy">
              School uniforms made simple
            </span>

            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find your school.
              <br />
              <span className="text-mustard">
                Shop with confidence.
              </span>
            </h1>

            <p className="mt-2 p-3 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
              Find the right uniform, choose the right size,
              and get everything your child needs in one place.
            </p>


            {/* HERO SCHOOL SEARCH */}

              

                <button
                  onClick={() =>
                    document
                      .getElementById("products")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="rounded-xl bg-navy px-8 py-4 text font-semibold text-white transition hover:bg-navy-light"
                >
                  Shop Now
                </button>

              

            


            {/* QUICK STATS */}
            <div className="mt-6 flex flex-wrap gap-5 text-xs font-medium text-white/75">

              <span>✓ School-specific products</span>
              <span>✓ Size guidance</span>
              <span>✓ AI customer support</span>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          QUICK SCHOOL SEARCH
      ====================================================== */}

      <section id="schools" className="relative z-10 -mt-8 px-5">

        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-4 shadow-xl">

          <div className="grid gap-3 md:grid-cols-[1fr_240px_200px]">

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                🔍
              </span>

              <input
                className="input-field pl-11"
                placeholder="Search products, e.g. white shirt"
                value={filters.q}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    q: e.target.value,
                  })
                }
              />
            </div>

            <select
              className="input-field"
              value={filters.school}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  school: e.target.value,
                })
              }
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
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value,
                })
              }
            >
              <option value="">All categories</option>

              {CATEGORIES.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                >
                  {category.name}
                </option>
              ))}
            </select>

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">

        <div className="mb-8 text-center">

          <p className="section-label">
            Browse the collection
          </p>

          <h2 className="section-title">
            Shop by category
          </h2>

        </div>


        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">

          {CATEGORIES.map((category) => (

            <button
              key={category.value}
              onClick={() =>
                chooseCategory(category.value)
              }
              className="category-card group"
            >

              <span className="category-icon transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </span>

              <span className="mt-3 font-semibold text-navy">
                {category.name}
              </span>

              <span className="mt-1 text-xs text-navy/40">
                Shop now →
              </span>

            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          SCHOOL FINDER
      ====================================================== */}

      <section className="bg-navy py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mb-8">

            <p className="section-label">
              School collection
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Find uniforms for your school
            </h2>

            <p className="mt-2 max-w-xl text-sm text-white/60">
              Select your school and we'll show you the
              uniforms available for it.
            </p>

          </div>


          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {schools.map((school) => (

              <button
                key={school._id}
                onClick={() =>
                  chooseSchool(school._id)
                }
                className="school-card group"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mustard/15 text-xl transition group-hover:scale-110">
                  🎓
                </div>

                <h3 className="mt-4 text-left font-semibold text-white">
                  {school.name}
                </h3>

                <p className="mt-1 text-left text-xs text-white/50">
                  {school.address}
                </p>

                <p className="mt-4 text-left text-xs font-semibold text-mustard">
                  View uniforms →
                </p>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCTS
      ====================================================== */}

      <section
        id="products"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8"
      >

        <div className="mb-8 flex items-end justify-between">

          <div>

            <p className="section-label">
              Our collection
            </p>

            <h2 className="section-title">
              {filters.category
                ? `${filters.category} collection`
                : "Popular uniforms"}
            </h2>

          </div>

          <span className="rounded-full bg-navy/5 px-4 py-2 text-xs font-semibold text-navy/60">
            {products.length} items
          </span>

        </div>


        {loading ? (

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {[1,2,3,4,5,6,7,8].map((item) => (

              <div
                key={item}
                className="h-80 animate-pulse rounded-xl bg-navy/5"
              />

            ))}

          </div>

        ) : products.length === 0 ? (

          <div className="rounded-2xl bg-white py-20 text-center">

            <div className="text-5xl">
              🔎
            </div>

            <h3 className="mt-4 font-semibold text-navy">
              No products found
            </h3>

            <p className="mt-2 text-sm text-navy/50">
              Try another school or category.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {products.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            ))}

          </div>

        )}

      </section>


      {/* =====================================================
          TRUST STRIP
      ====================================================== */}

      <section className="border-y border-navy/10 bg-white">

        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">

          <div>
            <div className="text-2xl">🎓</div>

            <h3 className="mt-3 font-semibold text-navy">
              School-specific
            </h3>

            <p className="mt-1 text-sm text-navy/50">
              Find uniforms matched to your child's school.
            </p>
          </div>

          <div>
            <div className="text-2xl">📏</div>

            <h3 className="mt-3 font-semibold text-navy">
              Size guidance
            </h3>

            <p className="mt-1 text-sm text-navy/50">
              Choose confidently with practical size information.
            </p>
          </div>

          <div>
            <div className="text-2xl">🤖</div>

            <h3 className="mt-3 font-semibold text-navy">
              AI support
            </h3>

            <p className="mt-1 text-sm text-navy/50">
              Ask about products, sizing, orders, delivery and returns.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}