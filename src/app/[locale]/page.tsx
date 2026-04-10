import { getTranslations, getMessages } from "next-intl/server";
import Link from "next/link";

export default async function GlobalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "global" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const messages = await getMessages({ locale });
  const globalMsg = messages.global as Record<string, unknown>;
  const zonesRaw = (globalMsg.zones as Record<string, unknown>).items as Array<{
    number: string; icon: string; name: string; location: string; description: string; details: string[];
  }>;
  const zoneItems = zonesRaw.map((z) => ({
    number: z.number,
    icon: z.icon,
    name: z.name,
    location: z.location,
    description: z.description,
    details: Array.isArray(z.details) ? z.details : [],
  }));

  const exhibitorSteps = [0, 1, 2, 3].map((i) => ({
    n: t(`howItWorks.exhibitor_steps.${i}.n`),
    title: t(`howItWorks.exhibitor_steps.${i}.title`),
    desc: t(`howItWorks.exhibitor_steps.${i}.desc`),
  }));

  const visitorSteps = [0, 1, 2, 3].map((i) => ({
    n: t(`howItWorks.visitor_steps.${i}.n`),
    title: t(`howItWorks.visitor_steps.${i}.title`),
    desc: t(`howItWorks.visitor_steps.${i}.desc`),
  }));

  const faqItems = [0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  const callBenefits = [0,1,2,3,4,5,6,7,8].map((i) => t(`call.benefits.${i}`));
  const categories = [0,1,2,3,4,5,6].map((i) => ({
    icon: t(`sell.categories.${i}.icon`),
    label: t(`sell.categories.${i}.label`),
  }));

  const countriesMsg = globalMsg.countries as Record<string, unknown>;
  const regionsRaw = (countriesMsg.regions as Array<{ name: string; countries: string[] }>) || [];
  const regions = regionsRaw.map((r) => ({
    name: r.name,
    countries: Array.isArray(r.countries) ? r.countries : [],
  }));

  return (
    <>
      {/* SECTION 1: HERO */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a1628 0%, #162544 50%, #1a1a2e 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(22,37,68,0.6) 0%, transparent 50%)" }} />
        <div className="section-container" style={{ textAlign: "center", position: "relative" }}>
          <span className="badge" style={{ marginBottom: "1.5rem" }}>{t("hero.badge")}</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.05, marginBottom: "1.25rem", color: "#FFFFFF" }}>
            Kids Entrepreneurs{" "}
            <span className="gradient-text">Fair</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "rgba(255,255,255,0.75)", maxWidth: "650px", margin: "0 auto 1rem", fontStyle: "italic", lineHeight: 1.6 }}>
            {t("hero.tagline")}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem, 2vw, 1rem)", color: "#D4A017", marginBottom: "2.5rem", letterSpacing: "0.02em" }}>
            {t("hero.tags")}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a href="#countries" className="btn-primary">{t("hero.cta_primary")}</a>
            <a href="#about" className="btn-outline">{t("hero.cta_secondary")}</a>
          </div>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[0,1,2].map((i) => (
              <span key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: "#D4A017" }}>✓</span> {t(`hero.stats.${i}`)}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", marginTop: "2rem" }}>
            {tc("backed")}
          </p>
        </div>
      </section>

      {/* SECTION 2: WHAT IS THE FAIR? */}
      <section id="about" className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "La Feria" : "About"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "1.5rem" }}>
              {t("about.title")}
            </h2>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1.25rem", textAlign: "center" }}>
            {t("about.description")}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, textAlign: "center", marginBottom: "3rem" }}>
            {t("about.description2")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[0,1,2].map((i) => (
              <div key={i} className="card-dark" style={{ textAlign: "center", padding: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color: "#D4A017", marginBottom: "0.25rem" }}>
                  {t(`about.stats.${i}.value`)}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {t(`about.stats.${i}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TWO EXPERIENCES */}
      <section id="experiences" className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Experiencias" : "Experiences"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>
              {t("experiences.title")}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)" }}>
              {t("experiences.subtitle")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div className="card-dark" style={{ border: "1px solid rgba(212,160,23,0.4)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ backgroundColor: "rgba(212,160,23,0.15)", color: "#D4A017", padding: "0.35rem 0.9rem", borderRadius: "999px", fontSize: "0.75rem", fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.05em", display: "inline-block", alignSelf: "flex-start" }}>
                🥇 {t("experiences.exhibitor.credential")}
              </span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.35rem", color: "#FFFFFF" }}>
                {t("experiences.exhibitor.title")}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, flex: 1 }}>
                {t("experiences.exhibitor.description")}
              </p>
              <a href="#call" className="btn-primary" style={{ textAlign: "center", textDecoration: "none" }}>
                {t("experiences.exhibitor.cta")} →
              </a>
            </div>
            <div className="card-dark" style={{ border: "1px solid rgba(22,37,68,0.8)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ backgroundColor: "rgba(22,37,68,0.8)", color: "rgba(255,255,255,0.6)", padding: "0.35rem 0.9rem", borderRadius: "999px", fontSize: "0.75rem", fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.05em", display: "inline-block", alignSelf: "flex-start" }}>
                🎟️ {t("experiences.visitor.credential")}
              </span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.35rem", color: "#FFFFFF" }}>
                {t("experiences.visitor.title")}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                {t("experiences.visitor.description")}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                {[0,1,2,3,4].map((i) => (
                  <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#D4A017", flexShrink: 0 }}>✓</span>
                    {t(`experiences.visitor.benefits.${i}`)}
                  </li>
                ))}
              </ul>
              <a href="#countries" className="btn-outline" style={{ textAlign: "center", textDecoration: "none" }}>
                {t("experiences.visitor.cta")} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE 4 ZONES */}
      <section id="zones" className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Zonas" : "Zones"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>
              {t("zones.title")}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", maxWidth: "580px", margin: "0 auto" }}>
              {t("zones.subtitle")}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {zoneItems.map((zone) => (
              <div key={zone.number} className="card-dark" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "flex-start", padding: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", backgroundColor: "rgba(212,160,23,0.15)", border: "2px solid rgba(212,160,23,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "#D4A017" }}>
                    {zone.number}
                  </div>
                  <span style={{ fontSize: "1.75rem" }}>{zone.icon}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
                    {zone.location}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "#D4A017", marginBottom: "0.75rem" }}>
                    {zone.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1rem" }}>
                    {zone.description}
                  </p>
                  {zone.details.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {zone.details.map((d, i) => (
                        <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                          <span style={{ color: "#D4A017", flexShrink: 0 }}>→</span> {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: OPEN CALL */}
      <section id="call" className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container" style={{ maxWidth: "850px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Convocatoria" : "Open Call"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "1.25rem" }}>
              {t("call.title")}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto" }}>
              {t("call.description")}
            </p>
          </div>
          <div className="card-dark" style={{ padding: "2rem", border: "1px solid rgba(212,160,23,0.2)" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#D4A017", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              🏆 {t("call.benefits_title")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.6rem" }}>
              {callBenefits.map((benefit, i) => (
                <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#D4A017", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a href="#countries" className="btn-primary">{t("call.cta")} →</a>
          </div>
        </div>
      </section>

      {/* SECTION 6: CERTIFICATES */}
      <section className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Certificados" : "Certificates"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>
              {t("certificates.title")}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)" }}>
              {t("certificates.subtitle")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { emoji: "🏅", key: "exhibitor" as const },
              { emoji: "🎓", key: "visitor" as const },
            ].map(({ emoji, key }) => (
              <div key={key} className="card-dark" style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{emoji}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "#D4A017", marginBottom: "0.75rem" }}>
                  {t(`certificates.${key}.title`)}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  {t(`certificates.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHAT CAN I SELL? */}
      <section className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Productos" : "Products"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF" }}>
              {t("sell.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {categories.map((cat, i) => (
              <div key={i} className="card-dark" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{cat.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{cat.label}</span>
              </div>
            ))}
          </div>
          <div className="card-dark" style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)", padding: "1rem 1.5rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <span style={{ fontSize: "1.25rem" }}>⚠️</span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,100,100,0.9)", lineHeight: 1.5 }}>
              {t("sell.note")}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: HOW IT WORKS */}
      <section className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container" style={{ maxWidth: "900px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "¿Cómo funciona?" : "How it works"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF" }}>
              {t("howItWorks.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem" }}>
            {[
              { titleKey: "howItWorks.exhibitor_title", steps: exhibitorSteps, accent: "#D4A017" },
              { titleKey: "howItWorks.visitor_title", steps: visitorSteps, accent: "rgba(255,255,255,0.5)" },
            ].map(({ titleKey, steps, accent }) => (
              <div key={titleKey}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: accent, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {t(titleKey)}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {steps.map((step) => (
                    <div key={step.n} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "#D4A017", flexShrink: 0 }}>
                        {step.n}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "#FFFFFF", marginBottom: "0.25rem" }}>
                          {step.title}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section id="faq" className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container" style={{ maxWidth: "750px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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

      {/* SECTION 10: SPONSORS */}
      <section id="sponsors" className="section-padding" style={{ backgroundColor: "#162544" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>Sponsors</span>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>
            {t("sponsors.title")}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>
            {t("sponsors.subtitle")}
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[1,2,3,4,5,6,7,8].map((n) => (
              <div key={n} style={{ width: "140px", height: "60px", border: "1px dashed rgba(212,160,23,0.2)", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
                {locale === "es" ? "Patrocinador" : "Sponsor"}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: FIND THE FAIR IN YOUR COUNTRY */}
      <section id="countries" className="section-padding" style={{ backgroundColor: "#0a1628" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>{locale === "es" ? "Países" : "Countries"}</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>
              {t("countries.title")}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", maxWidth: "560px", margin: "0 auto" }}>
              {t("countries.subtitle")}
            </p>
          </div>

          {/* Active: Colombia */}
          <div style={{ maxWidth: "500px", margin: "0 auto 3rem" }}>
            <Link
              href={`/${locale}/colombia`}
              className="card-dark"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.5rem 2rem",
                textDecoration: "none",
                border: "1px solid rgba(212,160,23,0.5)",
                transition: "border-color 0.2s",
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "#D4A017", marginBottom: "0.25rem" }}>
                  🇨🇴 {t("countries.active.name")}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                  {t("countries.active.badge")} · {t("countries.active.cities")}
                </p>
              </div>
              <span style={{ color: "#D4A017", fontSize: "1.25rem" }}>→</span>
            </Link>
          </div>

          {/* Coming Soon Regions */}
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem", textAlign: "center" }}>
              {t("countries.coming_soon_title")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {regions.map((region) => (
                <div key={region.name}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                    {region.name}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {region.countries.map((c) => (
                      <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "999px", padding: "0.3rem 0.9rem" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
