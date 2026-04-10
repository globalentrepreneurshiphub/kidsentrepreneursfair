import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SUPPORTED_COUNTRIES = ["colombia"] as const;

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

  const cities = [0, 1, 2, 3].map((i) => ({
    name: t(`cities.items.${i}.name`),
    slug: t(`cities.items.${i}.slug`),
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
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a1628 0%, #162544 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 20% 60%, rgba(212,160,23,0.06) 0%, transparent 60%)" }} />
        <div className="section-container" style={{ position: "relative" }}>
          <nav style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link href={`/${locale}`} style={{ color: "#D4A017", textDecoration: "none" }}>
              {locale === "es" ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <span style={{ textTransform: "capitalize" }}>{country}</span>
          </nav>
          <span className="badge" style={{ marginBottom: "1.5rem", backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", borderColor: "rgba(34,197,94,0.2)" }}>
            🟢 {t("hero.badge")}
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)", lineHeight: 1.1, marginBottom: "1rem", color: "#FFFFFF" }}>
            Kids Entrepreneurs{" "}
            <span className="gradient-text">Fair</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
            {t("hero.subtitle")}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", fontStyle: "italic", marginBottom: "1.25rem" }}>
            {t("hero.tagline")}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#D4A017", marginBottom: "2.5rem", letterSpacing: "0.02em" }}>
            {t("hero.cities_line")}
          </p>
          <a href="#cities" className="btn-primary">{t("hero.cta")} ↓</a>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", marginTop: "2rem" }}>
            {tc("backed")}
          </p>
        </div>
      </section>

      {/* CITIES */}
      <section id="cities" className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Ciudades" : "Cities"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF" }}>
              {t("cities.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
            {cities.map((city, i) => {
              const isActive = city.slug === "bogota";
              return isActive ? (
                <Link
                  key={city.slug}
                  href={`/${locale}/${country}/${city.slug}`}
                  className="card-dark"
                  style={{ textDecoration: "none", padding: "1.75rem", border: "1px solid rgba(212,160,23,0.5)", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "border-color 0.2s" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "#D4A017" }}>
                      {city.name}
                    </p>
                    <span style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", padding: "0.15rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontFamily: "var(--font-body)", fontWeight: 600, whiteSpace: "nowrap" }}>
                      🟢 {tc("open")}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{city.venue}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{city.dates}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#D4A017", marginTop: "0.5rem" }}>
                    {locale === "es" ? "Ver convocatoria →" : "View open call →"}
                  </p>
                </Link>
              ) : (
                <div
                  key={city.slug}
                  className="card-dark"
                  style={{ padding: "1.75rem", opacity: 0.45, display: "flex", flexDirection: "column", gap: "0.5rem" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "rgba(255,255,255,0.6)" }}>
                      {city.name}
                    </p>
                    <span style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", padding: "0.15rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontFamily: "var(--font-body)", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {tc("comingSoon")}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>{city.venue}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>{city.dates}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container" style={{ maxWidth: "700px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Cronograma" : "Timeline"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF" }}>
              {t("timeline.title")}
            </h2>
          </div>
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: "0.625rem", top: 0, bottom: 0, width: "2px", backgroundColor: "rgba(212,160,23,0.2)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {timelineSteps.map((step, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "-1.625rem", top: "0.3rem", width: "0.75rem", height: "0.75rem", borderRadius: "50%", backgroundColor: "#D4A017", border: "2px solid #0a1628" }} />
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#D4A017", marginBottom: "0.25rem" }}>
                    {step.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>Sponsors</span>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>
            {t("sponsors.title")}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", marginBottom: "2.5rem" }}>
            {t("sponsors.subtitle")}
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[1,2,3,4,5,6,7,8].map((n) => (
              <div key={n} style={{ width: "130px", height: "55px", border: "1px dashed rgba(212,160,23,0.2)", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
                {locale === "es" ? "Patrocinador" : "Sponsor"}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Contacto" : "Contact"}</span>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF", marginBottom: "2rem" }}>
            {t("contact.title")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
            <a href={`mailto:${t("contact.email")}`} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#D4A017", textDecoration: "none" }}>
              ✉️ {t("contact.email")}
            </a>
            <a href="https://instagram.com/kidsentrepreneursfair" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              📸 {t("contact.instagram")}
            </a>
            <a href={`https://${t("contact.website")}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
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
