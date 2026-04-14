"use client";

import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("common.footer");
  const locale = useLocale();

  const columns = [
    {
      title: locale === "es" ? "La Feria" : "The Fair",
      links: [
        { label: locale === "es" ? "Qué es la feria" : "About the fair", href: "#about" },
        { label: locale === "es" ? "Experiencias" : "Experiences", href: "#experiences" },
        { label: locale === "es" ? "Zonas de la feria" : "Fair zones", href: "#zones" },
        { label: locale === "es" ? "Convocatoria" : "Open call", href: "#call" },
      ],
    },
    {
      title: locale === "es" ? "Emprendedores" : "Entrepreneurs",
      links: [
        { label: locale === "es" ? "Stand Virtual Kids" : "Virtual Stand Kids", href: "#marketplace" },
        { label: "Club Kids", href: "#clubkids" },
        { label: locale === "es" ? "Qué puedo vender" : "What can I sell", href: "#products" },
        { label: locale === "es" ? "Cómo funciona" : "How it works", href: "#howto" },
      ],
    },
    {
      title: locale === "es" ? "Visitantes" : "Visitors",
      links: [
        { label: locale === "es" ? "Registrar mi familia" : "Register my family", href: "#countries" },
        { label: locale === "es" ? "Ciudades" : "Cities", href: "#countries" },
      ],
    },
  ];

  const socials = [
    { icon: "📸", href: "https://instagram.com/kidsentrepreneursfair", label: "Instagram" },
    { icon: "🎵", href: "https://tiktok.com/@kidsentrepreneursfair", label: "TikTok" },
    { icon: "▶️", href: "https://youtube.com/@kidsentrepreneursfair", label: "YouTube" },
    { icon: "💬", href: "https://wa.me/", label: "WhatsApp" },
  ];

  return (
    <footer
      style={{
        background: "var(--color-navy)",
        color: "rgba(255,255,255,0.7)",
        padding: "3.5rem 2rem 2rem",
        fontSize: "0.9rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.6rem",
              color: "white",
              marginBottom: "0.3rem",
            }}
          >
            🚀 Kids Entrepreneurs Fair
          </p>
          <p
            style={{
              maxWidth: "500px",
              margin: "0.5rem auto 0",
              lineHeight: 1.6,
              fontSize: "0.85rem",
            }}
          >
            {t("tagline")}
          </p>
        </div>

        {/* Columns */}
        <div className="footer-columns">
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  color: "white",
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  marginBottom: "0.8rem",
                }}
              >
                {col.title}
              </h4>
              {col.links.map((link) => (
                <p key={link.label} style={{ marginBottom: "0.4rem" }}>
                  <a
                    href={link.href}
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          ))}

          {/* Social column */}
          <div>
            <h4
              style={{
                color: "white",
                fontFamily: "var(--font-heading)",
                fontSize: "1rem",
                marginBottom: "0.8rem",
              }}
            >
              {locale === "es" ? "Síguenos" : "Follow us"}
            </h4>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    fontSize: "1.1rem",
                    transition: "background 0.3s",
                    textDecoration: "none",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.8rem" }}>
              📧 {t("email")}
            </p>
          </div>
        </div>

        {/* Organizer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "1.5rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🌐</span>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>
              {locale === "es" ? "Organizado por" : "Organized by"}{" "}
              <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>
                Global Entrepreneurship Hub UAE
              </span>
            </p>
          </div>
        </div>

        {/* Legal */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1rem",
            fontSize: "0.75rem",
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "0.3rem" }}>
            © {new Date().getFullYear()} Kids Entrepreneurs Fair — {t("rights")}
          </p>
          <p>
            <a href="#" style={{ color: "var(--color-gold)", textDecoration: "none" }}>
              {locale === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </a>
            {" · "}
            <a href="#" style={{ color: "var(--color-gold)", textDecoration: "none" }}>
              {locale === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
            </a>
            {" · "}
            <a href="#" style={{ color: "var(--color-gold)", textDecoration: "none" }}>
              {locale === "es" ? "Política de Cookies" : "Cookie Policy"}
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .footer-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: left;
          margin-bottom: 2.5rem;
        }
        .footer-columns > div {
          min-width: 0;
        }
        .footer-columns p {
          overflow-wrap: anywhere;
        }
        @media (max-width: 960px) {
          .footer-columns {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
          }
        }
        @media (max-width: 360px) {
          .footer-columns {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
