import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/slam-book", label: "My Slam Book" },
  { to: "/friends", label: "Friends" },
];

export default function Navbar() {
  return (
    <header className="sb-nav">
      <nav className="sb-nav-inner" aria-label="Main navigation">
        <Link to="/" className="brand">
          💖 SlamBook
        </Link>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="nav-link"
                activeProps={{ className: "nav-link active" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <Link to="/friends/new" className="btn btn-primary btn-sm">
            + Add Friend
          </Link>
          <ThemeToggle />
          <span className="avatar-chip" title="Vaibhao Kamble" aria-hidden="true">
            👤
          </span>
        </div>
      </nav>
    </header>
  );
}
