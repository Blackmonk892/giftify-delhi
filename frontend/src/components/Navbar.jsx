import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, LogOut, Lock, Menu, X, ShoppingBag } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-display tracking-widest text-white hover:opacity-90 transition"
        >
          GIFTIFY<span className="text-[#d4af37]">DELHI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#d4af37] transition"
          >
            Home
          </Link>
          {/* NEW LINKS ADDED HERE */}
          <Link
            to="/shop"
            className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#d4af37] transition"
          >
            Explore
          </Link>
          <Link
            to="/about"
            className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#d4af37] transition"
          >
            About
          </Link>

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center gap-1 text-[#d4af37] hover:text-white transition"
            >
              <Lock size={16} />
              <span className="text-xs uppercase font-bold">Admin</span>
            </Link>
          )}
        </nav>

        {/* Icons / Auth */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/purchase-history"
                className="text-gray-300 hover:text-[#d4af37] transition flex flex-col items-center group"
                title="My Orders"
              >
                <ShoppingBag size={20} />
              </Link>

              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-[#d4af37] transition"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-red-400 transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-sm uppercase tracking-wider font-semibold text-white hover:text-[#d4af37] transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden sm:block px-5 py-2 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white transition hover:scale-105 transform"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-t border-white/10 p-6 flex flex-col gap-4 shadow-xl">
          <Link
            to="/shop"
            className="text-gray-300 hover:text-[#d4af37]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore Collection
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-[#d4af37]"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/purchase-history"
            className="text-gray-300 hover:text-[#d4af37]"
            onClick={() => setMobileMenuOpen(false)}
          >
            My Orders
          </Link>
          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="text-[#d4af37] font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
export default Navbar;
