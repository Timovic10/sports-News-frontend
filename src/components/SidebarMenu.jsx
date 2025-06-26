import { Link } from "react-router-dom";

export default function SidebarMenu({ open, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-xl">×</button>
      </div>
      <nav className="flex flex-col items-start px-6 space-y-4 text-lg">
        <Link to="/" onClick={onClose}>🏠 Home</Link>
        <Link to="/categories" onClick={onClose}>📚 Categories</Link>
        <Link to="/admin" onClick={onClose}>🛠 Admin</Link>
      </nav>
    </div>
  );
}
