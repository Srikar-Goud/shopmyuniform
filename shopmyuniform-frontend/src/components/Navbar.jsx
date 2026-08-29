import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-cream font-display text-sm font-semibold">
            SU
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-navy">
            ShopMy<span className="text-maroon">Uniform</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-navy/80 md:flex">
          <Link to="/" className="hover:text-navy">Catalog</Link>
          {user && <Link to="/orders" className="hover:text-navy">My Orders</Link>}
          {user && <Link to="/profile" className="hover:text-navy">Profile</Link>}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-navy" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.602-7.152.078-.312-.16-.598-.482-.598H5.106M7.5 14.25L5.106 5.272M6.75 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm11.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-maroon text-[10px] font-bold text-cream">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="btn-secondary !px-3 !py-1.5 text-xs"
            >
              Log out
            </button>
          ) : (
            <Link to="/login" className="btn-primary !px-4 !py-1.5 text-xs">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
