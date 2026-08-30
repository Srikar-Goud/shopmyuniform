import { Link } from "react-router-dom";
import { IconMail, IconPin, IconHeadset } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded bg-white font-bold text-navy">SU</span>
            <span className="font-display text-lg font-bold">
              ShopMy<span className="text-mustard">Uniform</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
            School uniforms made simple. Find your school, choose the right products and shop with confidence.
          </p>
          <p className="mt-5 text-xs text-white/40">Hyderabad, India</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-mustard">Shop</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
            <Link to="/#schools" className="transition hover:text-white">Find Your School</Link>
            <Link to="/#products" className="transition hover:text-white">School Uniforms</Link>
            <Link to="/?category=Accessory#products" className="transition hover:text-white">Accessories</Link>
            <Link to="/?category=Shoes#products" className="transition hover:text-white">Footwear</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-mustard">Customer Support</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
            <Link to="/orders" className="transition hover:text-white">Track My Orders</Link>
            <span>Returns &amp; Exchanges</span>
            <span>Size Guide</span>
            <button
              onClick={() => document.querySelector("[data-chat-widget]")?.click()}
              className="flex items-center gap-2 text-left transition hover:text-white"
            >
              <IconHeadset className="h-4 w-4" />
              Ask AI Support
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-mustard">Contact</h3>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            <p className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0" />
              support@shopmyuniform.example
            </p>
            <p className="flex items-center gap-2">
              <IconPin className="h-4 w-4 shrink-0" />
              Hyderabad, Telangana
            </p>
            <p className="pt-2 text-xs leading-5 text-white/40">Customer support available Monday-Saturday.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 ShopMyUniform. All rights reserved.</p>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Returns Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}