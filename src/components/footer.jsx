import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-400 text-gray-300 pt-16 pb-6 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Left - Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Sport<span className="text-blue-300">News</span>
          </h2>
          <p className="text-sm text-gray-700">
            Bringing you the latest updates, match highlights, and sports
            stories from around the world.
          </p>
        </div>

        {/* Middle - Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <a href="/home" className="hover:text-white transition">
            Home
          </a>

          <a href="/articles" className="hover:text-white transition">
            Articles
          </a>
        </div>

        {/* Right - Social Media */}
        <div>
          <h3 className="font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} SportNews. All rights reserved.
      </div>
    </footer>
  );
}
