import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed  inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed shadow-sm shadow-slate-400 top-0 left-0 h-full w-80 z-50 overflow-y-auto transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
          bg-[#f0f0f0] dark:bg-[#1A1A1D]`}
      >
        <Link to="/" className="ml-5 flex justify-center mt-20">
          <img
            src="/src/assets/spImg.jpg"
            className="hidden dark:block w-14 h-14 rounded-full"
          />
          <img
            src="/src/assets/spImg.jpg"
            className="block dark:hidden w-14 h-14 rounded-full"
          />
        </Link>

        <div className="flex flex-col gap-5 text-black dark:text-white p-4 space-y-3  overflow-y-scroll">
          <span className="flex flex-col gap-4"></span>
          <span className="flex flex-col gap-4">
            <a href="/dashboard">Dashboard</a>
            <a href="/articleDahboard">Article</a>
            <a href="/settings">Settings</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
