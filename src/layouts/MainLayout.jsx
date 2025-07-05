import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import BlImg from "../assets/bl.png";
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1  h-full overflow-y-auto text-black dark:text-white transition-colors duration-300 bg-[#f0f0f0] dark:bg-[#1A1A1D]">
        {/* Header */}
        <div className="flex  justify-between items-center px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:opacity-0  p-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            <FiMenu size={20} />
          </button>

          <Link to="/" className="w-28 lg:hidden">
            <img src={BlImg} className="hidden dark:block " />
            <img src={BlImg} className="block dark:hidden" />
          </Link>

          <span className="flex items-center gap-2">
            <p>&nbsp;</p>
          </span>
        </div>

        {/* Main content */}
        <main className="px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// lg:ml-64

export default MainLayout;
