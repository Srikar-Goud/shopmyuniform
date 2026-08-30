import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">

      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">

        {/* BRAND */}
        <div className="md:col-span-1">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-mustard font-bold text-navy">
              SU
            </span>

            <span className="font-display text-xl font-bold">
              ShopMy<span className="text-mustard">
                Uniform
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-6 text-cream/60">
            School uniforms made simple. Find your school,
            choose the right products and shop with confidence.
          </p>

          <p className="mt-5 text-xs text-cream/40">
            Hyderabad, India
          </p>

        </div>


        {/* SHOP */}
        <div>

          <h3 className="text-sm font-bold uppercase tracking-wider text-mustard">
            Shop
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-cream/65">

            <Link
              to="/#schools"
              className="transition hover:text-white"
            >
              Find Your School
            </Link>

            <Link
              to="/#products"
              className="transition hover:text-white"
            >
              School Uniforms
            </Link>

            <Link
              to="/?category=Accessory#products"
              className="transition hover:text-white"
            >
              Accessories
            </Link>

            <Link
              to="/?category=Shoes#products"
              className="transition hover:text-white"
            >
              Footwear
            </Link>

          </div>

        </div>


        {/* CUSTOMER SUPPORT */}
        <div>

          <h3 className="text-sm font-bold uppercase tracking-wider text-mustard">
            Customer Support
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-cream/65">

            <Link
              to="/orders"
              className="transition hover:text-white"
            >
              Track My Orders
            </Link>

            <span>
              Returns & Exchanges
            </span>

            <span>
              Size Guide
            </span>

            <button
              onClick={() => {
                document
                  .querySelector("[data-chat-widget]")
                  ?.click();
              }}
              className="text-left transition hover:text-white"
            >
              🤖 Ask AI Support
            </button>

          </div>

        </div>


        {/* CONTACT */}
        <div>

          <h3 className="text-sm font-bold uppercase tracking-wider text-mustard">
            Contact
          </h3>

          <div className="mt-5 space-y-3 text-sm text-cream/65">

            <p>
              📧 support@shopmyuniform.example
            </p>

            <p>
              📍 Hyderabad, Telangana
            </p>

            <p className="pt-2 text-xs leading-5 text-cream/40">
              Customer support available Monday–Saturday.
            </p>

          </div>

        </div>

      </div>


      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <p>
            © 2026 ShopMyUniform. All rights reserved.
          </p>

          <div className="flex gap-5">

            <span>
              Privacy Policy
            </span>

            <span>
              Terms & Conditions
            </span>

            <span>
              Returns Policy
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}