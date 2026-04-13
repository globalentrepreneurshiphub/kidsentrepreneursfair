"use client";

interface CardData {
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  colorClass: string;
  borderColor: string;
  iconBg: string;
  featured?: boolean;
}

interface SectionCardsProps {
  title: string;
  subtitle: string;
  cards: CardData[];
}

export default function SectionCards({ title, subtitle, cards }: SectionCardsProps) {
  const featured = cards.filter((c) => c.featured);
  const secondary = cards.filter((c) => !c.featured);

  return (
    <section id="about" style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2rem",
            color: "var(--color-dark-text)",
            marginBottom: "0.3rem",
          }}
        >
          {title}
        </h2>
        <p style={{ color: "var(--color-body-text)", fontSize: "1.05rem" }}>{subtitle}</p>
      </div>

      {/* Featured cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
        className="cards-featured-grid"
      >
        {featured.map((card) => (
          <Card key={card.href} card={card} />
        ))}
      </div>

      {/* Secondary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {secondary.map((card) => (
          <Card key={card.href} card={card} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cards-featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function Card({ card }: { card: CardData }) {
  return (
    <a
      href={card.href}
      style={{
        display: "block",
        textDecoration: "none",
        background: card.featured
          ? `linear-gradient(145deg, var(--color-card-bg), #FFFDF7)`
          : "var(--color-card-bg)",
        borderRadius: "20px",
        padding: card.featured ? "2.5rem" : "2rem",
        border: `${card.featured ? "2px" : "1px"} solid ${card.borderColor}`,
        boxShadow: "var(--shadow-card)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
    >
      <div
        style={{
          width: card.featured ? "60px" : "45px",
          height: card.featured ? "60px" : "45px",
          borderRadius: card.featured ? "18px" : "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: card.featured ? "1.8rem" : "1.4rem",
          marginBottom: card.featured ? "1.2rem" : "0.8rem",
          background: card.iconBg,
        }}
      >
        {card.icon}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: card.featured ? "1.4rem" : "1.15rem",
          color: "var(--color-dark-text)",
          marginBottom: card.featured ? "0.6rem" : "0.4rem",
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: card.featured ? "1rem" : "0.9rem",
          color: "var(--color-body-text)",
          lineHeight: 1.6,
        }}
      >
        {card.description}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          marginTop: "1rem",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "0.85rem",
          color: "var(--color-gold)",
        }}
      >
        {card.cta}{" "}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          style={{ transition: "transform 0.3s" }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}
