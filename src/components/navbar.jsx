import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import SidebarMenu from "./SidebarMenu";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navClass = (path) =>
    location.pathname === path
      ? "text-blue-600 font-bold"
      : "hover:text-blue-600";

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          SportsNews
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={navClass("/")}>
            Home
          </Link>

          <Link to="/categories" className={navClass("/categories")}>
            Categories
          </Link>
          <Link to="/admin" className={navClass("/admin")}>
            Admin
          </Link>
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
