import { getTranslations, getMessages } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import SectionCards from "@/components/home/SectionCards";
import AboutSection from "@/components/home/AboutSection";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import ZonesSection from "@/components/home/ZonesSection";
import ProductsSection from "@/components/home/ProductsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CallSection from "@/components/home/CallSection";
import ContactForm from "@/components/home/ContactForm";
import StandVirtualSection from "@/components/home/StandVirtualSection";
import ClubKidsSection from "@/components/home/ClubKidsSection";
import CountriesSection from "@/components/home/CountriesSection";
import SponsorsSection from "@/components/home/SponsorsSection";

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

  // Hero data
  const heroMsg = globalMsg.hero as Record<string, unknown>;
  const heroKeywords = heroMsg.keywords as string[];
  const heroStats = heroMsg.stats as string[];

  // Section cards data
  const scMsg = globalMsg.sectionCards as Record<string, unknown>;
  const scCards = scMsg.cards as Record<string, Record<string, string>>;

  const cardDefinitions = [
    { key: "about", icon: "🎪", href: "#about-detail", colorClass: "gold", borderColor: "var(--color-gold)", iconBg: "var(--color-gold-soft)", featured: true },
    { key: "experiences", icon: "🌟", href: "#experiences", colorClass: "coral", borderColor: "var(--color-coral)", iconBg: "var(--color-coral-soft)", featured: true },
    { key: "zones", icon: "🗺️", href: "#zones", colorClass: "mint", borderColor: "var(--color-mint)", iconBg: "var(--color-mint-soft)", featured: true },
    { key: "call", icon: "📢", href: "#call", colorClass: "lavender", borderColor: "var(--color-border)", iconBg: "var(--color-lavender-soft)", featured: false },
    { key: "products", icon: "🛍️", href: "#products", colorClass: "peach", borderColor: "var(--color-border)", iconBg: "var(--color-peach-soft)", featured: false },
    { key: "howto", icon: "📋", href: "#howto", colorClass: "gold", borderColor: "var(--color-border)", iconBg: "var(--color-gold-soft)", featured: false },
    { key: "marketplace", icon: "🏪", href: "#marketplace", colorClass: "coral", borderColor: "var(--color-border)", iconBg: "var(--color-coral-soft)", featured: false },
    { key: "clubkids", icon: "👑", href: "#clubkids", colorClass: "lavender", borderColor: "var(--color-border)", iconBg: "var(--color-lavender-soft)", featured: false },
  ];

  const cards = cardDefinitions.map((def) => ({
    ...def,
    title: scCards[def.key].title,
    description: scCards[def.key].description,
    cta: scCards[def.key].cta,
  }));

  // About stats
  const aboutStatsRaw = (globalMsg.about as Record<string, unknown>).stats as Array<{ value: string; label: string }>;
  const aboutStats = aboutStatsRaw.map((s) => ({ value: s.value, label: s.label }));

  // Zones data
  const zonesRaw = (globalMsg.zones as Record<string, unknown>).items as Array<{
    number: string; icon: string; name: string; location: string; description: string; details: string[];
  }>;
  const zoneItems = zonesRaw.map((z) => ({
    number: z.number, icon: z.icon, name: z.name, location: z.location,
    description: z.description, details: Array.isArray(z.details) ? z.details : [],
  }));
  // Steps data
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

  // FAQ
  const faqItems = [0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  // Call data
  const callBenefits = [0,1,2,3,4,5,6,7,8].map((i) => t(`call.benefits.${i}`));
  const callHowSteps = [0,1,2,3].map((i) => t(`call.how_steps.${i}`));

  // Categories
  const categories = [0,1,2,3,4,5,6].map((i) => ({
    icon: t(`sell.categories.${i}.icon`),
    label: t(`sell.categories.${i}.label`),
  }));

  // Countries
  const countriesMsg = globalMsg.countries as Record<string, unknown>;
  const comingSoonCountries = (countriesMsg.coming_soon_countries as Array<{ flag: string; name: string }>) || [];

  return (
    <>
      {/* HERO */}
      <HeroSection
        badge={tc("backed")}
        tagline={t("hero.tagline")}
        subtitle={t("hero.subtitle")}
        ctaPrimary={t("hero.cta_primary")}
        ctaSecondary={t("hero.cta_secondary")}
        stats={heroStats}
        backed={tc("backed")}
        keywords={heroKeywords}
      />

      {/* SECTION CARDS */}
      <SectionCards
        title={t("sectionCards.title")}
        subtitle={t("sectionCards.subtitle")}
        cards={cards}
      />

      {/* ===== ABOUT DETAIL ===== */}
      <AboutSection
        sectionLabel={locale === "es" ? "La Feria" : "About"}
        title={t("about.title")}
        description={t("about.description")}
        description2={t("about.description2")}
        stats={aboutStats}
      />

      {/* ===== EXPERIENCES ===== */}
      <ExperiencesSection
        sectionLabel={locale === "es" ? "Experiencias" : "Experiences"}
        title={t("experiences.title")}
        subtitle={t("experiences.subtitle")}
        exhibitor={{
          title: t("experiences.exhibitor.title"),
          credential: t("experiences.exhibitor.credential"),
          description: t("experiences.exhibitor.description"),
          cta: t("experiences.exhibitor.cta"),
        }}
        visitor={{
          title: t("experiences.visitor.title"),
          credential: t("experiences.visitor.credential"),
          description: t("experiences.visitor.description"),
          benefits: [0, 1, 2, 3, 4].map((i) => t(`experiences.visitor.benefits.${i}`)),
          cta: t("experiences.visitor.cta"),
        }}
      />

      {/* ===== ZONES ===== */}
      <ZonesSection
        sectionLabel={locale === "es" ? "Zonas" : "Zones"}
        title={t("zones.title")}
        subtitle={t("zones.subtitle")}
        items={zoneItems}
      />

      {/* ===== OPEN CALL ===== */}
      <CallSection
        sectionLabel={locale === "es" ? "Convocatoria" : "Open Call"}
        title={t("call.title")}
        description={t("call.description")}
        benefitsTitle={t("call.benefits_title")}
        benefits={callBenefits}
        cta={t("call.cta")}
        howTitle={t("call.how_title")}
        howSteps={callHowSteps}
      />

      {/* ===== PRODUCTS ===== */}
      <ProductsSection
        sectionLabel={locale === "es" ? "Productos" : "Products"}
        title={t("sell.title")}
        categories={categories}
        note={t("sell.note")}
      />

      {/* ===== HOW IT WORKS ===== */}
      <HowItWorksSection
        sectionLabel={locale === "es" ? "Paso a paso" : "Step by step"}
        title={t("howItWorks.title")}
        exhibitorTitle={t("howItWorks.exhibitor_title")}
        exhibitorSteps={exhibitorSteps}
        visitorTitle={t("howItWorks.visitor_title")}
        visitorSteps={visitorSteps}
      />

      {/* ===== MARKETPLACE PLACEHOLDER ===== */}
      <StandVirtualSection locale={locale} />

      {/* ===== CLUB KIDS PLACEHOLDER ===== */}
      <ClubKidsSection locale={locale} />

      {/* ===== FAQ ===== */}
      <section id="faq" style={{ padding: "5rem 2rem", background: "white" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label" style={{ background: "var(--color-sky-soft)", color: "var(--color-sky)" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.2rem)" }}>{t("faq.title")}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqItems.map((item, i) => (
              <details key={i} style={{ background: "var(--color-light-bg)", borderRadius: "15px", padding: "1.25rem 1.5rem", border: "1px solid var(--color-border)", cursor: "pointer" }}>
                <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--color-dark-text)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  {item.q}
                  <span style={{ fontSize: "1.1rem", color: "var(--color-gold)", flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: "0.9rem", color: "var(--color-body-text)", marginTop: "0.75rem", lineHeight: 1.7 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <SponsorsSection
        locale={locale}
        sectionLabel={locale === "es" ? "Aliados" : "Partners"}
        title={t("sponsors.title")}
        subtitle={t("sponsors.subtitle")}
        organizerLabel={t("sponsors.organizer_label")}
        organizerName={t("sponsors.organizer_name")}
        organizerDesc={t("sponsors.organizer_desc")}
        ctaText={t("sponsors.cta")}
      />

      {/* ===== COUNTRIES ===== */}
      <CountriesSection
        locale={locale}
        sectionLabel={locale === "es" ? "Países" : "Countries"}
        title={t("countries.title")}
        subtitle={t("countries.subtitle")}
        countryName={t("countries.active.name")}
        countryFlag="🇨🇴"
        countryBadge={tc("firstEdition")}
        countryDesc={locale === "es" ? "Cuatro ciudades principales, centros comerciales premium." : "Four major cities, premium shopping malls."}
        cities={[
          { name: "Bogotá", slug: "bogota", icon: "🏙️", sub: "Capital" },
          { name: "Cali", slug: "cali", icon: "🌴", sub: "Valle del Cauca" },
          { name: "Medellín", slug: "medellin", icon: "🌿", sub: "Antioquia" },
          { name: "Barranquilla", slug: "barranquilla", icon: "🌊", sub: "Atlántico" },
        ]}
        comingSoonTitle={t("countries.coming_soon_title")}
        comingSoonCountries={comingSoonCountries}
        formTitle={t("countries.form_title")}
        formSubtitle={t("countries.form_subtitle")}
        formNameLabel={t("countries.form_name")}
        formEmailLabel={t("countries.form_email")}
        formCityLabel={t("countries.form_city")}
        formCountryLabel={t("countries.form_country")}
        formSubmitLabel={t("countries.form_submit")}
        formSuccessMessage={t("countries.form_success")}
        formErrorMessage={t("countries.form_error")}
      />

      {/* ===== CONTACT ===== */}
      <ContactForm
        sectionLabel={locale === "es" ? "Contacto" : "Contact"}
        title={t("contact.title")}
        subtitle={locale === "es"
          ? "¿Tienes preguntas, propuestas de patrocinio o quieres llevar la feria a tu ciudad? Escríbenos."
          : "Have questions, sponsorship proposals, or want to bring the fair to your city? Write to us."}
        nameLabel={t("contact.name")}
        emailLabel={t("contact.email")}
        messageLabel={t("contact.message")}
        sendLabel={t("contact.send")}
        successMessage={t("contact.success")}
        errorMessage={t("contact.error")}
        locale={locale}
      />
    </>
  );
}
