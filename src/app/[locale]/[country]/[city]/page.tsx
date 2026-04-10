import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RegistrationTabs from "@/components/registration/RegistrationTabs";

const SUPPORTED_CITIES = ["bogota"] as const;
const SUPPORTED_COUNTRIES = ["colombia"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; city: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "city.hero" });
  return {
    title: `${t("title")} | kidsentrepreneursfair.com`,
    description: t("status"),
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
    !SUPPORTED_CITIES.includes(city as "bogota")
  ) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "city" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const timelineSteps = [0, 1, 2, 3].map((i) => ({
    label: t(`timeline.steps.${i}.label`),
    value: t(`timeline.steps.${i}.value`),
  }));

  const faqItems = [0, 1, 2, 3].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  return (
    <>
      {/* SECTION 1: HERO */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a1628 0%, #162544 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 70% 30%, rgba(212,160,23,0.07) 0%, transparent 60%)" }} />
        <div className="section-container" style={{ position: "relative" }}>
          <nav style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href={`/${locale}`} style={{ color: "#D4A017", textDecoration: "none" }}>
              {locale === "es" ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/${country}`} style={{ color: "#D4A017", textDecoration: "none", textTransform: "capitalize" }}>
              {country}
            </Link>
            <span>/</span>
            <span style={{ textTransform: "capitalize" }}>{city}</span>
          </nav>
          <span className="badge" style={{ marginBottom: "1.5rem" }}>{t("hero.badge")}</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)", lineHeight: 1.1, marginBottom: "1.25rem", color: "#FFFFFF" }}>
            Kids Entrepreneurs <span className="gradient-text">Fair</span>
            <span style={{ display: "block", fontSize: "0.65em", color: "rgba(255,255,255,0.6)", marginTop: "0.25rem" }}>
              — Bogotá
            </span>
          </h1>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              📍 {t("hero.venue")}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              📅 {t("hero.dates")}
            </span>
          </div>
          <span style={{ display: "inline-block", backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", padding: "0.3rem 0.9rem", borderRadius: "999px", fontSize: "0.8rem", fontFamily: "var(--font-body)", fontWeight: 600, marginBottom: "2rem" }}>
            🟢 {t("hero.status")}
          </span>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#register" className="btn-primary">{t("hero.cta_exhibitor")} →</a>
            <a href="#register" className="btn-outline">{t("hero.cta_visitor")}</a>
          </div>
        </div>
      </section>

      {/* SECTION 2: DATES & VENUE */}
      <section className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Información" : "Info"}</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF" }}>
              {t("info.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", maxWidth: "700px", margin: "0 auto" }}>
            {[
              { icon: "📍", label: t("info.venue_label"), value: t("info.venue_value") },
              { icon: "📅", label: t("info.dates_label"), value: t("info.dates_value") },
              { icon: "🕐", label: t("info.hours_label"), value: t("info.hours_value") },
            ].map((item) => (
              <div key={item.label} className="card-dark" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem" }}>
                <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "#D4A017" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BOGOTÁ TIMELINE */}
      <section className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container" style={{ maxWidth: "600px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Cronograma" : "Timeline"}</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF" }}>
              {t("timeline.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {timelineSteps.map((step, i) => (
              <div key={i} className="card-dark" style={{ padding: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  {step.label}
                </p>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#D4A017" }}>
                  {step.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 & 5: REGISTRATION FORMS */}
      <section id="register" className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container" style={{ maxWidth: "750px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>
              {locale === "es" ? "Inscripción" : "Registration"}
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF" }}>
              {t("register.title")}
            </h2>
          </div>
          <RegistrationTabs locale={locale} city={city} country={country} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container" style={{ maxWidth: "700px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF" }}>
              {t("faq.title")}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqItems.map((item, i) => (
              <details key={i} className="card-dark" style={{ cursor: "pointer" }}>
                <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "#D4A017", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  {item.q}
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", marginTop: "0.75rem", lineHeight: 1.7 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="section-padding" style={{ background: "linear-gradient(135deg, #0a1628 0%, #162544 100%)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>
            {t("cta.title")}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", marginBottom: "0.5rem", lineHeight: 1.7 }}>
            {t("cta.subtitle")}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#D4A017", marginBottom: "2.5rem" }}>
            {t("cta.note")}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#register" className="btn-primary">{t("cta.cta_exhibitor")} →</a>
            <a href="#register" className="btn-outline">{t("cta.cta_visitor")}</a>
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.flatMap((country) =>
    SUPPORTED_CITIES.map((city) => ({ country, city }))
  );
}
