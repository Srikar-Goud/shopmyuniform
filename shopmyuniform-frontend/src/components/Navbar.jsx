import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* TOP INFO BAR */}
      <div className="hidden bg-cream px-5 py-2 text-center text-xs font-semibold text-navy/70 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span>Free delivery on orders over ₹999</span>
          <span>School uniforms made simple</span>
          <span>Easy returns & exchanges</span>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="bg-navy text-cream">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4">

          {/* LOGO */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-mustard font-display text-sm font-bold text-navy">
              SU
            </span>

            <span className="hidden font-display text-xl font-bold tracking-tight sm:block">
              ShopMy<span className="text-mustard">Uniform</span>
            </span>
          </Link>

          {/* SEARCH */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Start here by searching for your school"
              className="
                w-full rounded-full
                border-0
                bg-white
                px-5 py-3
                pr-12
                text-sm
                text-navy
                shadow-sm
                outline-none
                placeholder:text-navy/45
                focus:ring-2
                focus:ring-mustard
              "
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = e.target.value.trim();

                  if (value) {
                    navigate(`/?q=${encodeURIComponent(value)}`);
                  }
                }
              }}
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-navy">
              🔍
            </span>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex shrink-0 items-center gap-2">

            {/* ACCOUNT */}
            <Link
              to={user ? "/profile" : "/login"}
              className="hidden rounded-xl px-3 py-2 text-center transition hover:bg-white/10 sm:block"
            >
              <div className="text-lg">👤</div>
              <span className="text-[11px]">
                {user ? "Account" : "Sign in"}
              </span>
            </Link>

            {/* ORDERS */}
            {user && (
              <Link
                to="/orders"
                className="hidden rounded-xl px-3 py-2 text-center transition hover:bg-white/10 md:block"
              >
                <div className="text-lg">📦</div>
                <span className="text-[11px]">
                  Orders
                </span>
              </Link>
            )}

            {/* CART */}
            <Link
              to="/cart"
              className="relative rounded-full bg-white px-4 py-2 text-sm font-bold text-navy transition hover:bg-mustard"
            >
              🛍️
              <span className="ml-1 hidden sm:inline">
                Cart
              </span>

              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-maroon text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* CHECKOUT */}
            {user && itemCount > 0 && (
              <Link
                to="/checkout"
                className="
                  hidden rounded-full
                  bg-mustard
                  px-4 py-2
                  text-sm font-bold
                  text-navy
                  transition
                  hover:brightness-95
                  lg:block
                "
              >
                Checkout →
              </Link>
            )}

            {/* LOGOUT */}
            {user && (
              <button
                onClick={handleLogout}
                className="
                  hidden
                  rounded-full
                  border border-white/20
                  px-4 py-2
                  text-sm
                  font-semibold
                  text-white/80
                  transition
                  hover:border-mustard
                  hover:text-mustard
                  sm:block
                "
              >
                Log out
              </button>
            )}

          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-7 overflow-x-auto px-5 py-3 text-sm font-semibold text-navy/80">

          <Link
            to="/#schools"
            className="whitespace-nowrap transition hover:text-maroon"
          >
            Find Your School
          </Link>

          <Link
            to="/#products"
            className="whitespace-nowrap transition hover:text-maroon"
          >
            School Uniforms
          </Link>

          <Link
            to="/?category=Accessory#products"
            className="whitespace-nowrap transition hover:text-maroon"
          >
            Accessories
          </Link>

          <Link
            to="/?category=Shoes#products"
            className="whitespace-nowrap transition hover:text-maroon"
          >
            Footwear
          </Link>

          <Link
            to="/#products"
            className="whitespace-nowrap transition hover:text-maroon"
          >
            New Arrivals
          </Link>

          {user && (
            <Link
              to="/orders"
              className="whitespace-nowrap transition hover:text-maroon"
            >
              My Orders
            </Link>
          )}

          {/* AI SUPPORT */}
          <button
            onClick={() => {
              const chatButton = document.querySelector(
                "[data-chat-widget]"
              );

              if (chatButton) {
                chatButton.click();
              }
            }}
            className="whitespace-nowrap text-maroon transition hover:text-navy"
          >
            🤖 AI Support
          </button>

        </div>
      </nav>

    </header>
  );
}