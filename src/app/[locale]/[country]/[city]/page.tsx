import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RegistrationTabs from "@/components/registration/RegistrationTabs";
import { CITIES, SUPPORTED_COUNTRIES, type CitySlug } from "@/lib/cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city } = await params;
  const cityName = CITIES[city as CitySlug]?.name ?? city;
  const t = await getTranslations({ locale, namespace: "city.hero" });
  return {
    title: `Kids Entrepreneurs Fair — ${cityName} | kidsentrepreneursfair.com`,
    description: `${cityName} · ${t("badge")}`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; city: string }>;
}) {
  const { locale, country, city } = await params;

  if (
    !SUPPORTED_COUNTRIES.includes(country as "colombia") ||
    !(city in CITIES)
  ) {
    notFound();
  }

  const cityData = CITIES[city as CitySlug];
  const isOpen = cityData.status === "open";
  const t = await getTranslations({ locale, namespace: "city" });
  const tg = await getTranslations({ locale, namespace: "global" });

  const timelineSteps = [0, 1, 2, 3].map((i) => ({
    label: t(`timeline.steps.${i}.label`),
    value: t(`timeline.steps.${i}.value`),
  }));

  const faqItems = [0, 1, 2, 3].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  const zones = [0, 1, 2, 3].map((i) => ({
    number: tg(`zones.items.${i}.number`),
    icon: tg(`zones.items.${i}.icon`),
    name: tg(`zones.items.${i}.name`),
    location: tg(`zones.items.${i}.location`),
  }));

  const zoneGradients = [
    "linear-gradient(145deg, var(--color-peach-soft), #FFFDF8)",
    "linear-gradient(145deg, var(--color-coral-soft), #FFFBFB)",
    "linear-gradient(145deg, var(--color-gold-soft), #FFFDF4)",
    "linear-gradient(145deg, var(--color-sky-soft), #FAFEFF)",
  ];
  const zoneAccents = [
    "var(--color-peach)",
    "var(--color-coral)",
    "var(--color-gold)",
    "var(--color-sky)",
  ];

  return (
    <>
      {/* SECTION 1: HERO */}
      <section
        style={{
          minHeight: "62vh",
          padding: "120px 2rem 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 25%, #FFF2EB 60%, #FFFDF7 100%)",
          backgroundSize: "250% 250%",
          animation: "gradientMove 14s ease infinite",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: "260px",
            height: "260px",
            background:
              "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 9s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "6%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(155,127,212,0.1) 0%, transparent 70%)",
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
            <Link
              href={`/${locale}/${country}`}
              style={{ color: "var(--color-gold)", textDecoration: "none", textTransform: "capitalize", fontWeight: 600 }}
            >
              {country}
            </Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ textTransform: "capitalize", color: "var(--color-dark-text)", fontWeight: 600 }}>{city}</span>
          </nav>

          <div style={{ marginBottom: "1.25rem" }}>
            <span className="sponsor-badge">
              <span style={{ fontSize: "1.1rem" }}>{cityData.icon}</span>
              <span>
                {cityData.name} · {t("hero.badge")}
              </span>
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.25rem)",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
              color: "var(--color-dark-text)",
            }}
          >
            Kids Entrepreneurs <span className="gradient-text">Fair</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.15rem",
              color: "var(--color-lavender)",
              fontWeight: 700,
              letterSpacing: "0.5px",
              marginBottom: "1.25rem",
            }}
          >
            — {cityData.name}
          </p>

          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-body-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              📍 {t("hero.venue")}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-body-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              📅 {t("hero.dates")}
            </span>
          </div>

          <span
            style={{
              display: "inline-block",
              background: isOpen ? "rgba(86,201,168,0.15)" : "var(--color-lavender-soft)",
              color: isOpen ? "var(--color-mint)" : "var(--color-lavender)",
              padding: "0.35rem 1rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              marginBottom: "2rem",
            }}
          >
            {isOpen ? "🟢" : "🟡"} {isOpen ? t("hero.status_open") : t("hero.status_coming")}
          </span>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {isOpen ? (
              <>
                <a href="#register" className="btn-primary">
                  {t("hero.cta_exhibitor")} →
                </a>
                <a href="#register" className="btn-secondary">
                  {t("hero.cta_visitor")}
                </a>
              </>
            ) : (
              <Link href={`/${locale}#countries`} className="btn-primary">
                {locale === "es" ? "← Volver a países" : "← Back to countries"}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: INFO (Dates & Venue) */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-light-bg)" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              className="section-label"
              style={{ background: "var(--color-gold-soft)", color: "var(--color-gold)" }}
            >
              {locale === "es" ? "Información" : "Info"}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-dark-text)", marginTop: "0.5rem" }}>
              {t("info.title")} — {cityData.name}
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {[
              { icon: "📍", label: t("info.venue_label"), value: t("info.venue_value") },
              { icon: "📅", label: t("info.dates_label"), value: t("info.dates_value") },
              { icon: "🕐", label: t("info.hours_label"), value: t("info.hours_value") },
              { icon: "🎟️", label: t("info.entry_label"), value: t("info.entry_value") },
              { icon: "👧", label: t("info.ages_label"), value: t("info.ages_value") },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem",
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      color: "var(--color-body-text)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--color-dark-text)",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ZONES */}
      <section className="section-padding" style={{ backgroundColor: "white" }}>
        <div className="section-container" style={{ maxWidth: "1000px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              className="section-label"
              style={{ background: "var(--color-mint-soft)", color: "var(--color-mint)" }}
            >
              {locale === "es" ? "Experiencia" : "Experience"}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-dark-text)", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              {locale === "es" ? "Las 4 zonas de la feria" : "The 4 fair zones"}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-text)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.6 }}>
              {locale === "es"
                ? "La feria está diseñada como un recorrido conectado. Cada zona lleva a la siguiente."
                : "The fair is designed as a connected journey. Each zone leads to the next."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {zones.map((zone, i) => (
              <div
                key={zone.number}
                style={{
                  background: zoneGradients[i],
                  borderRadius: "20px",
                  padding: "1.75rem",
                  borderLeft: `4px solid ${zoneAccents[i]}`,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: zoneAccents[i],
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {zone.number}
                </div>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{zone.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--color-dark-text)",
                    marginBottom: "0.35rem",
                    lineHeight: 1.3,
                  }}
                >
                  {zone.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--color-body-text)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  {zone.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CERTIFICATES */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-light-bg)" }}>
        <div className="section-container" style={{ maxWidth: "900px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              className="section-label"
              style={{ background: "var(--color-gold-soft)", color: "var(--color-gold)" }}
            >
              {locale === "es" ? "Reconocimiento" : "Recognition"}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-dark-text)", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              {tg("certificates.title")}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-text)", maxWidth: "640px", margin: "0 auto", lineHeight: 1.6 }}>
              {tg("certificates.subtitle")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, var(--color-gold-soft), var(--color-peach-soft))",
                borderRadius: "20px",
                padding: "2rem",
                border: "1px solid rgba(212,160,23,0.25)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏆</div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--color-dark-text)",
                  marginBottom: "0.5rem",
                }}
              >
                {tg("certificates.exhibitor.title")}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-body-text)",
                  lineHeight: 1.6,
                }}
              >
                {tg("certificates.exhibitor.description")}
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(145deg, var(--color-mint-soft), var(--color-sky-soft))",
                borderRadius: "20px",
                padding: "2rem",
                border: "1px solid rgba(86,201,168,0.25)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📜</div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--color-dark-text)",
                  marginBottom: "0.5rem",
                }}
              >
                {tg("certificates.visitor.title")}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-body-text)",
                  lineHeight: 1.6,
                }}
              >
                {tg("certificates.visitor.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CITY TIMELINE */}
      <section className="section-padding" style={{ backgroundColor: "white" }}>
        <div className="section-container" style={{ maxWidth: "680px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              className="section-label"
              style={{ background: "var(--color-coral-soft)", color: "var(--color-coral)" }}
            >
              {locale === "es" ? "Cronograma" : "Timeline"}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-dark-text)", marginTop: "0.5rem" }}>
              {t("timeline.title")} — {cityData.name}
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "1rem",
            }}
          >
            {timelineSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem",
                  background: "var(--color-light-bg)",
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    color: "var(--color-body-text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.4rem",
                    fontWeight: 600,
                  }}
                >
                  {step.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--color-gold)",
                  }}
                >
                  {step.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: REGISTRATION (open only) or coming-soon block */}
      {isOpen ? (
        <section id="register" className="section-padding" style={{ backgroundColor: "var(--color-light-bg)" }}>
          <div className="section-container" style={{ maxWidth: "750px" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span
                className="section-label"
                style={{ background: "var(--color-lavender-soft)", color: "var(--color-lavender)" }}
              >
                {locale === "es" ? "Inscripción" : "Registration"}
              </span>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--color-dark-text)", marginTop: "0.5rem" }}>
                {t("register.title")}
              </h2>
            </div>
            <RegistrationTabs locale={locale} city={city} country={country} />
          </div>
        </section>
      ) : (
        <section id="register" className="section-padding" style={{ backgroundColor: "var(--color-light-bg)" }}>
          <div className="section-container" style={{ maxWidth: "640px", textAlign: "center" }}>
            <span
              className="section-label"
              style={{ background: "var(--color-lavender-soft)", color: "var(--color-lavender)" }}
            >
              {locale === "es" ? "Próximamente" : "Coming Soon"}
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--color-dark-text)",
                marginTop: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {locale === "es"
                ? `Estamos preparando la feria en ${cityData.name}`
                : `We're preparing the fair in ${cityData.name}`}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-body-text)",
                marginBottom: "2rem",
                lineHeight: 1.7,
              }}
            >
              {locale === "es"
                ? "Muy pronto anunciaremos fechas, lugar y convocatoria. Déjanos tu correo en la sección de países del home para avisarte primero."
                : "We'll announce dates, venue, and open call soon. Drop your email in the countries section on the home page so we can notify you first."}
            </p>
            <Link href={`/${locale}#countries`} className="btn-primary">
              {locale === "es" ? "Volver a países" : "Back to countries"}
            </Link>
          </div>
        </section>
      )}

      {/* SECTION 7: FAQ (open only) */}
      {isOpen && (
        <section id="faq" className="section-padding" style={{ backgroundColor: "white" }}>
          <div className="section-container" style={{ maxWidth: "720px" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span
                className="section-label"
                style={{ background: "var(--color-sky-soft)", color: "var(--color-sky)" }}
              >
                FAQ
              </span>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--color-dark-text)", marginTop: "0.5rem" }}>
                {t("faq.title")}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  style={{
                    background: "var(--color-light-bg)",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)",
                    padding: "1.1rem 1.25rem",
                    cursor: "pointer",
                  }}
                >
                  <summary
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--color-dark-text)",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {item.q}
                    <span style={{ fontSize: "1.2rem", color: "var(--color-gold)", flexShrink: 0 }}>+</span>
                  </summary>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--color-body-text)",
                      marginTop: "0.75rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: FINAL CTA (open only) */}
      {isOpen && (
        <section
          className="section-padding"
          style={{
            background:
              "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 40%, #F0EAFF 100%)",
          }}
        >
          <div className="section-container" style={{ textAlign: "center", maxWidth: "720px" }}>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                color: "var(--color-dark-text)",
                marginBottom: "0.75rem",
              }}
            >
              {t("cta.title")}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                color: "var(--color-body-text)",
                marginBottom: "0.5rem",
                lineHeight: 1.7,
              }}
            >
              {t("cta.subtitle")}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "var(--color-gold)",
                marginBottom: "2.5rem",
                fontWeight: 600,
              }}
            >
              {t("cta.note")}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#register" className="btn-primary">
                {t("cta.cta_exhibitor")} →
              </a>
              <a href="#register" className="btn-secondary">
                {t("cta.cta_visitor")}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.flatMap((country) =>
    (Object.keys(CITIES) as CitySlug[]).map((city) => ({ country, city }))
  );
}
