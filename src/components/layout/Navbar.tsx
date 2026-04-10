"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("common.nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleLocale() {
    const otherLocale = locale === "es" ? "en" : "es";
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = otherLocale;
    router.push("/" + segments.join("/"));
  }

  const links = [
    { href: "#about", label: t("about") },
    { href: "#zones", label: t("zones") },
    { href: "#call", label: t("call") },
    { href: "#faq", label: t("faq") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(10, 22, 40, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212, 160, 23, 0.15)",
      }}
    >
      <div
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "1.125rem",
            color: "#D4A017",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🚀</span>
          <span>Kids Entrepreneurs Fair</span>
        </Link>

        <div
          className="desktop-nav"
          style={{
            display: "none",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#D4A017")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
              }
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleLocale}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "#D4A017",
              background: "rgba(212, 160, 23, 0.1)",
              border: "1px solid rgba(212, 160, 23, 0.3)",
              borderRadius: "9999px",
              padding: "0.375rem 0.875rem",
              cursor: "pointer",
            }}
          >
            {tc("langToggle")}
          </button>
          <a href="#register" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
            {t("register")}
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#D4A017",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            backgroundColor: "#0a1628",
            padding: "1rem 1.5rem",
            borderTop: "1px solid rgba(212, 160, 23, 0.1)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.8)",
                padding: "0.75rem 0",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button
              onClick={toggleLocale}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.75rem",
                color: "#D4A017",
                background: "rgba(212, 160, 23, 0.1)",
                border: "1px solid rgba(212, 160, 23, 0.3)",
                borderRadius: "9999px",
                padding: "0.375rem 0.875rem",
                cursor: "pointer",
              }}
            >
              {tc("langToggle")}
            </button>
            <a href="#register" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
              {t("register")}
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
