import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    setOpen(false);

    navigate(`/?q=${encodeURIComponent(value)}`);

    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 150);
  };

  const handleCategory = () => {
    setOpen(false);

    setTimeout(() => {
      document
        .getElementById("categories")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* =========================
          TOP BAR
      ========================== */}

      <header className="sticky top-0 z-50 bg-navy text-cream shadow-lg">

        <div className="flex items-center gap-4 px-4 py-3 sm:px-6">

          {/* HAMBURGER */}

          <button
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl bg-white/10 transition hover:bg-white/20"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
          </button>


          {/* LOGO */}

          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-mustard font-display text-sm font-bold text-navy">
              SU
            </span>

            <span className="hidden font-display text-xl font-bold sm:block">
              ShopMy<span className="text-mustard">Uniform</span>
            </span>
          </Link>


          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="relative flex-1"
          >

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your school or uniform..."
              className="
                w-full
                rounded-full
                border-0
                bg-white
                px-5
                py-3
                pr-12
                text-sm
                text-navy
                outline-none
                placeholder:text-navy/40
                focus:ring-2
                focus:ring-mustard
              "
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-navy"
            >
              🔍
            </button>

          </form>


          {/* CART */}

          <Link
            to="/cart"
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lg text-navy transition hover:bg-mustard"
          >
            🛒

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-maroon text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

        </div>

      </header>


      {/* =========================
          BACKDROP
      ========================== */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] bg-black/50"
        />
      )}


      {/* =========================
          SIDEBAR
      ========================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[70]
          flex
          h-screen
          w-72
          flex-col
          bg-navy
          text-white
          shadow-2xl
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* SIDEBAR HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >

            <span className="grid h-11 w-11 place-items-center rounded-full bg-mustard font-display font-bold text-navy">
              SU
            </span>

            <div>
              <div className="font-display text-lg font-bold">
                ShopMy<span className="text-mustard">Uniform</span>
              </div>

              <p className="text-[10px] uppercase tracking-wider text-white/40">
                School uniforms
              </p>
            </div>

          </Link>


          {/* CLOSE */}

          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-white/60 transition hover:text-white"
          >
            ×
          </button>

        </div>


        {/* =========================
            MENU
        ========================== */}

        <nav className="flex-1 p-4">

          {/* HOME */}

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="mb-2 flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <span className="text-xl">🏠</span>
            <span>Home</span>
          </Link>


          {/* ORDERS */}

          {user && (
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="mb-2 flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-xl">📦</span>
              <span>My Orders</span>
            </Link>
          )}


          {/* CART */}

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="mb-2 flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >

            <span className="text-xl">🛒</span>

            <span className="flex-1">
              My Cart
            </span>

            {itemCount > 0 && (
              <span className="rounded-full bg-mustard px-2 py-0.5 text-xs font-bold text-navy">
                {itemCount}
              </span>
            )}

          </Link>


          {/* CATEGORY */}

          <button
            onClick={handleCategory}
            className="mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <span className="text-xl">🏷️</span>
            <span>Shop by Category</span>
          </button>

        </nav>


        {/* =========================
            ACCOUNT
        ========================== */}

        <div className="border-t border-white/10 p-4">

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="mb-2 flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/10"
              >

                <div className="grid h-10 w-10 place-items-center rounded-full bg-mustard text-lg text-navy">
                  👤
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold">
                    {user.name || "My Account"}
                  </p>

                  <p className="text-xs text-white/40">
                    View profile
                  </p>

                </div>

              </Link>


              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition hover:bg-red-500/10 hover:text-white"
              >
                <span className="text-xl">↪</span>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 rounded-xl bg-mustard px-4 py-3 text-sm font-bold text-navy"
            >
              <span>👤</span>
              Sign in
            </Link>
          )}

        </div>

      </aside>
    </>
  );
}