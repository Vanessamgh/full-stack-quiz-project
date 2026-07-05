"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Take the Quiz" },
  { href: "/faq", label: "FAQ" },
];

export default function NavLinks() {
  const pathname = usePathname();

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
