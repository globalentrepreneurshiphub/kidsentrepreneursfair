import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITIES, SUPPORTED_COUNTRIES, type CitySlug } from "@/lib/cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "country.hero" });
  return {
    title: `${t("title")} | kidsentrepreneursfair.com`,
    description: t("tagline"),
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;

  if (!SUPPORTED_COUNTRIES.includes(country as "colombia")) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "country" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const citySlugs = Object.keys(CITIES) as CitySlug[];
  const cityI18n = citySlugs.map((slug, i) => ({
    slug,
    venue: t(`cities.items.${i}.venue`),
    dates: t(`cities.items.${i}.dates`),
  }));

  const timelineSteps = [0, 1, 2, 3, 4].map((i) => ({
    label: t(`timeline.steps.${i}.label`),
    desc: t(`timeline.steps.${i}.desc`),
  }));

  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "68vh",
          padding: "120px 2rem 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 25%, #FFF2EB 55%, #F0EAFF 80%, #FFFDF7 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 14s ease infinite",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "12%",
            right: "8%",
            width: "280px",
            height: "280px",
            background:
              "radial-gradient(circle, rgba(212,160,23,0.12) 0%, rgba(255,107,107,0.05) 55%, transparent 75%)",
            borderRadius: "50%",
            animation: "float 9s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "6%",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle, rgba(155,127,212,0.12) 0%, rgba(86,201,168,0.05) 55%, transparent 75%)",
            borderRadius: "50%",
            animation: "floatReverse 11s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "800px", animation: "slideUp 1s ease-out" }}>
          <nav
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--color-body-text)",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <Link href={`/${locale}`} style={{ color: "var(--color-gold)", textDecoration: "none", fontWeight: 600 }}>
              {locale === "es" ? "Inicio" : "Home"}
            </Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ textTransform: "capitalize", color: "var(--color-dark-text)", fontWeight: 600 }}>{country}</span>
          </nav>

          <div style={{ marginBottom: "1.5rem" }}>
            <span className="sponsor-badge">
              <span style={{ fontSize: "1rem" }}>🟢</span>
              <span>{t("hero.badge")}</span>
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              lineHeight: 1.1,
              marginBottom: "0.8rem",
              color: "var(--color-dark-text)",
            }}
          >
            Kids Entrepreneurs <span className="gradient-text">Fair</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.2rem",
              color: "var(--color-lavender)",
              fontWeight: 700,
              letterSpacing: "0.5px",
              marginBottom: "1rem",
            }}
          >
            {t("hero.subtitle")}
          </p>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "var(--color-body-text)",
              fontStyle: "italic",
              maxWidth: "560px",
              margin: "0 auto 1.25rem",
              lineHeight: 1.7,
            }}
          >
            {t("hero.tagline")}
          </p>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--color-gold)",
              fontWeight: 700,
              letterSpacing: "0.03em",
              marginBottom: "2rem",
            }}
          >
            {t("hero.cities_line")}
          </p>

          <a href="#cities" className="btn-primary">
            {t("hero.cta")} ↓
          </a>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--color-body-text)",
              opacity: 0.6,
              marginTop: "2rem",
            }}
          >
            {tc("backed")}
          </p>
        </div>
      </section>

      {/* CITIES */}
      <section id="cities" className="section-padding" style={{ backgroundColor: "white" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              className="section-label"
              style={{ background: "var(--color-lavender-soft)", color: "var(--color-lavender)" }}
            >
              {locale === "es" ? "Ciudades" : "Cities"}
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.2rem)", color: "var(--color-dark-text)", marginTop: "0.5rem" }}>
              {t("cities.title")}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "1.5rem",
              maxWidth: "960px",
              margin: "0 auto",
            }}
          >
            {cityI18n.map(({ slug, venue, dates }) => {
              const city = CITIES[slug];
              const isOpen = city.status === "open";

              return isOpen ? (
                <Link
                  key={slug}
                  href={`/${locale}/${country}/${slug}`}
                  style={{
                    textDecoration: "none",
                    background: "linear-gradient(145deg, var(--color-gold-soft), #FFFDF4)",
                    borderRadius: "20px",
                    padding: "1.75rem",
                    border: "2px solid var(--color-gold)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    boxShadow: "0 6px 24px rgba(212,160,23,0.18)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ fontSize: "2rem" }}>{city.icon}</span>
                      <p
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          color: "var(--color-dark-text)",
                        }}
                      >
                        {city.name}
                      </p>
                    </div>
                    <span
                      style={{
                        background: "rgba(86,201,168,0.15)",
                        color: "var(--color-mint)",
                        padding: "0.2rem 0.7rem",
                        borderRadius: "999px",
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      🟢 {tc("open")}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-text)", lineHeight: 1.5 }}>
                    {venue}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-text)" }}>
                    {dates}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--color-gold)",
                      marginTop: "0.4rem",
                      fontWeight: 700,
                    }}
                  >
                    {locale === "es" ? "Ver convocatoria →" : "View open call →"}
                  </p>
                </Link>
              ) : (
                <Link
                  key={slug}
                  href={`/${locale}/${country}/${slug}`}
                  style={{
                    textDecoration: "none",
                    background: "var(--color-light-bg)",
                    borderRadius: "20px",
                    padding: "1.75rem",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ fontSize: "2rem", filter: "saturate(0.7)" }}>{city.icon}</span>
                      <p
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          color: "var(--color-dark-text)",
                        }}
                      >
                        {city.name}
                      </p>
                    </div>
                    <span
                      style={{
                        background: "var(--color-lavender-soft)",
                        color: "var(--color-lavender)",
                        padding: "0.2rem 0.7rem",
                        borderRadius: "999px",
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      🟡 {tc("comingSoon")}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-text)", lineHeight: 1.5 }}>
                    {venue}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-text)" }}>
                    {dates}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--color-lavender)",
                      marginTop: "0.4rem",
                      fontWeight: 700,
                    }}
                  >
                    {locale === "es" ? "Ver detalles →" : "View details →"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-light-bg)" }}>
        <div className="section-container" style={{ maxWidth: "720px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              className="section-label"
              style={{ background: "var(--color-coral-soft)", color: "var(--color-coral)" }}
            >
              {locale === "es" ? "Cronograma" : "Timeline"}
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.2rem)", color: "var(--color-dark-text)", marginTop: "0.5rem" }}>
              {t("timeline.title")}
            </h2>
          </div>

          <div style={{ position: "relative", paddingLeft: "2.2rem" }}>
            <div
              style={{
                position: "absolute",
                left: "0.65rem",
                top: "0.4rem",
                bottom: "0.4rem",
                width: "3px",
                background: "linear-gradient(180deg, var(--color-gold), var(--color-coral), var(--color-lavender))",
                borderRadius: "2px",
                opacity: 0.4,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {timelineSteps.map((step, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "-1.75rem",
                      top: "0.3rem",
                      width: "0.9rem",
                      height: "0.9rem",
                      borderRadius: "50%",
                      background: "var(--color-gold)",
                      border: "3px solid white",
                      boxShadow: "0 0 0 2px var(--color-gold-soft), 0 4px 12px rgba(212,160,23,0.25)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "var(--color-dark-text)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--color-body-text)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="section-padding" style={{ backgroundColor: "white" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <span
            className="section-label"
            style={{ background: "var(--color-gold-soft)", color: "var(--color-gold)" }}
          >
            Sponsors
          </span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--color-dark-text)",
              marginTop: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            {t("sponsors.title")}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-body-text)",
              marginBottom: "2.5rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {t("sponsors.subtitle")}
          </p>
          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap", maxWidth: "820px", margin: "0 auto" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                style={{
                  width: "140px",
                  height: "60px",
                  border: "2px dashed rgba(212,160,23,0.35)",
                  borderRadius: "12px",
                  background: "var(--color-gold-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--color-gold)",
                  opacity: 0.7,
                }}
              >
                {locale === "es" ? "Patrocinador" : "Sponsor"}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-padding" style={{ backgroundColor: "var(--color-light-bg)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "600px" }}>
          <span
            className="section-label"
            style={{ background: "var(--color-mint-soft)", color: "var(--color-mint)" }}
          >
            {locale === "es" ? "Contacto" : "Contact"}
          </span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--color-dark-text)",
              marginTop: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            {t("contact.title")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", alignItems: "center" }}>
            <a
              href={`mailto:${t("contact.email")}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-gold)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ✉️ {t("contact.email")}
            </a>
            <a
              href="https://instagram.com/kidsentrepreneursfair"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-body-text)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              📸 {t("contact.instagram")}
            </a>
            <a
              href={`https://${t("contact.website")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-body-text)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              🌐 {t("contact.website")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((country) => ({ country }));
}
