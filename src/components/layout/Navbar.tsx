"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const t = useTranslations("common.nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function toggleLocale() {
    const otherLocale = locale === "es" ? "en" : "es";
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = otherLocale;
    router.push("/" + segments.join("/"));
  }

  const menuItems = [
    { href: "#about", label: t("about"), icon: "🎪", bg: "var(--color-gold-soft)" },
    { href: "#call", label: t("call"), icon: "📢", bg: "var(--color-lavender-soft)" },
    { href: "#countries", label: locale === "es" ? "Países" : "Countries", icon: "🌎", bg: "var(--color-sky-soft)" },
    { href: "#faq", label: t("faq"), icon: "❓", bg: "var(--color-peach-soft)" },
    { href: "#contact", label: t("contact"), icon: "✉️", bg: "var(--color-mint-soft)" },
  ];

  return (
    <>
      <nav
        className="navbar-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0 2rem",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <Link
          href={`/${locale}`}
          className="navbar-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-heading)",
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "var(--color-dark-text)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          🚀 Kids Entrepreneurs <span style={{ color: "var(--color-gold)" }}>Fair</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <a
            href="#countries"
            className="navbar-cta"
            style={{
              background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-light))",
              color: "white",
              padding: "0.5rem 1.3rem",
              borderRadius: "50px",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.9rem",
              boxShadow: "0 4px 15px rgba(212,160,23,0.3)",
              transition: "transform 0.3s, box-shadow 0.3s",
              textDecoration: "none",
            }}
          >
            {t("register")}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: menuOpen ? "var(--color-gold-soft)" : "var(--color-light-bg)",
              border: `1px solid ${menuOpen ? "var(--color-gold)" : "var(--color-border)"}`,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              transition: "all 0.3s",
            }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "2.5px",
                background: "var(--color-dark-text)",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: menuOpen ? "translateY(7.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "2.5px",
                background: "var(--color-dark-text)",
                borderRadius: "2px",
                transition: "all 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "2.5px",
                background: "var(--color-dark-text)",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: menuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 520px) {
          .navbar-logo { font-size: 0.95rem !important; gap: 5px !important; overflow: hidden; min-width: 0; }
          .navbar-cta { display: none !important; }
          .navbar-bar { padding: 0 0.8rem !important; }
        }
      `}</style>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: 0,
            left: 0,
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "2px solid var(--color-border)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
            padding: "1rem 2rem 1.5rem",
            zIndex: 99,
            animation: "slideDown 0.3s ease",
          }}
        >
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.map((item, i) => (
              <li
                key={item.href}
                style={{ borderBottom: i < menuItems.length - 1 ? "1px solid var(--color-border)" : "none" }}
              >
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "0.9rem 0.5rem",
                    textDecoration: "none",
                    color: "var(--color-dark-text)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    transition: "all 0.2s",
                    borderRadius: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      background: item.bg,
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ paddingTop: "0.5rem" }}>
              <button
                onClick={() => { toggleLocale(); setMenuOpen(false); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "2px solid var(--color-gold)",
                  color: "var(--color-gold)",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "50px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                🌐 {tc("langToggle")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
