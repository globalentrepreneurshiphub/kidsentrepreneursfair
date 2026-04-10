"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("common.footer");

  return (
    <footer
      style={{
        backgroundColor: "#060d1a",
        borderTop: "1px solid rgba(212, 160, 23, 0.15)",
        padding: "3rem 0",
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "1.25rem",
                color: "#D4A017",
                marginBottom: "0.25rem",
              }}
            >
              🚀 Kids Entrepreneurs Fair
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {t("tagline")}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href="https://instagram.com/kidsentrepreneursfair"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D4A017")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              @kidsentrepreneursfair
            </a>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            © {new Date().getFullYear()} Kids Entrepreneurs Fair · {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
