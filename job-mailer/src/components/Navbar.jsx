import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/companies", label: "Companies" },
    { path: "/tracker", label: "Tracker" },
  ];

  return (
    <nav className="bg-gray-800 px-8 py-4 flex items-center justify-between border-b border-gray-700">
      <h1 className="text-blue-400 font-bold text-xl">Job Mailer 🚀</h1>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition-colors hover:text-blue-400 ${
              location.pathname === link.path
                ? "text-blue-400"
                : "text-gray-300"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
