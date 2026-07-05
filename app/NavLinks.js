"use client";

import { Component } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Take the Quiz" },
  { href: "/faq", label: "FAQ" },
];

/**
 * Persistent nav bar links, highlighting whichever route is active.
 * Written as an ES6 class component. `usePathname()` is a hook, so the
 * exported `NavLinks` function below just reads the current path and
 * passes it down as a prop to the `NavLinksList` class.
 */
class NavLinksList extends Component {
  render() {
    const { pathname } = this.props;
    return (
      <div className="nav-links">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  }
}

export default function NavLinks() {
  const pathname = usePathname();
  return <NavLinksList pathname={pathname} />;
}
