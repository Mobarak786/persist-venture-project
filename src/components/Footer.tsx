import { Link } from "react-router-dom";
import {
  RiGithubLine,
  RiTwitterLine,
  RiLinkedinBoxLine,
  RiHome2Line,
  RiCalendarEventLine,
  RiInformationLine,
} from "react-icons/ri";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Copyright */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">Comni</span>
            </Link>
            <p className="text-sm text-gray-600">
              © {currentYear} Comni. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home", Icon: RiHome2Line },
                { to: "/events", label: "Events", Icon: RiCalendarEventLine },
                { to: "/about", label: "About", Icon: RiInformationLine },
              ].map(({ to, label, Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {[
                { href: "#", Icon: RiGithubLine, label: "GitHub" },
                { href: "#", Icon: RiTwitterLine, label: "Twitter" },
                { href: "#", Icon: RiLinkedinBoxLine, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
