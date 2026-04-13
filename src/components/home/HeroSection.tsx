"use client";

interface HeroSectionProps {
  badge: string;
  tagline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: string[];
  backed: string;
  keywords: string[];
}

const floatingEmojis = [
  { emoji: "🚀", style: { top: "15%", left: "8%", animationDuration: "7s" } },
  { emoji: "💡", style: { top: "25%", right: "10%", animationDuration: "9s", animationDelay: "1s" } },
  { emoji: "⭐", style: { bottom: "25%", left: "12%", animationDuration: "8s", animationDelay: "2s" } },
  { emoji: "🎨", style: { bottom: "20%", right: "15%", animationDuration: "6s", animationDelay: "0.5s" } },
  { emoji: "🤖", style: { top: "40%", left: "3%", animationDuration: "11s", animationDelay: "3s" } },
  { emoji: "🌟", style: { top: "12%", right: "25%", animationDuration: "10s", animationDelay: "1.5s" } },
  { emoji: "✨", style: { bottom: "35%", right: "5%", animationDuration: "9s", animationDelay: "2.5s" } },
];

const sparkles = [
  { color: "var(--color-gold)", style: { top: "20%", left: "20%", animationDuration: "3s" } },
  { color: "var(--color-coral)", style: { top: "35%", right: "18%", animationDuration: "4s", animationDelay: "1s" } },
  { color: "var(--color-mint)", style: { bottom: "30%", left: "25%", animationDuration: "3.5s", animationDelay: "0.5s" } },
  { color: "var(--color-lavender)", style: { top: "50%", right: "30%", animationDuration: "5s", animationDelay: "2s" } },
  { color: "var(--color-sky)", style: { bottom: "15%", right: "35%", animationDuration: "4s", animationDelay: "1.5s" } },
  { color: "var(--color-peach)", style: { top: "60%", left: "10%", animationDuration: "3s", animationDelay: "2.5s" } },
];

const statIcons = ["📅", "🏬", "🎟️"];

export default function HeroSection({
  badge,
  tagline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
  backed,
  keywords,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        padding: "120px 2rem 60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 20%, #FFF2EB 40%, #F0EAFF 60%, #E8F6FF 80%, #FFFDF7 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientMove 12s ease infinite",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Decorative gradient circles */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "8%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(212,160,23,0.12) 0%, rgba(255,107,107,0.06) 50%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(155,127,212,0.12) 0%, rgba(86,201,168,0.06) 50%, transparent 70%)",
          borderRadius: "50%",
          animation: "floatReverse 10s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Floating emojis */}
      {floatingEmojis.map((item, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            fontSize: "2.5rem",
            opacity: 0.15,
            animation: `${i % 2 === 0 ? "float" : "floatReverse"} ${item.style.animationDuration} ease-in-out infinite`,
            animationDelay: item.style.animationDelay || "0s",
            top: item.style.top,
            bottom: item.style.bottom,
            left: item.style.left,
            right: item.style.right,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Sparkle dots */}
      {sparkles.map((s, i) => (
        <div
          key={`sparkle-${i}`}
          style={{
            position: "absolute",
            zIndex: 1,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            pointerEvents: "none",
            background: s.color,
            animation: `sparkle ${s.style.animationDuration} ease-in-out infinite`,
            animationDelay: s.style.animationDelay || "0s",
            top: s.style.top,
            bottom: s.style.bottom,
            left: s.style.left,
            right: s.style.right,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "850px",
          animation: "slideUp 1s ease-out",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.3rem, 8vw, 3.8rem)",
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
            fontSize: "1.3rem",
            color: "var(--color-lavender)",
            fontWeight: 700,
            letterSpacing: "0.5px",
            marginBottom: "0.5rem",
          }}
        >
          {subtitle}
        </p>

        {/* Sponsor badge */}
        <div style={{ marginBottom: "1.5rem" }}>
          <span className="sponsor-badge">
            <span style={{ fontSize: "1.2rem", filter: "drop-shadow(0 0 4px rgba(212,160,23,0.4))", animation: "pulse 3s ease-in-out infinite" }}>
              🌍
            </span>
            <span>
              {badge.split("Global")[0]}
              <strong style={{ color: "var(--color-gold-light)", fontWeight: 800 }}>
                Global Entrepreneurship Hub UAE
              </strong>
            </span>
          </span>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "var(--color-body-text)",
            fontWeight: 500,
            maxWidth: "600px",
            margin: "0 auto 1.5rem",
          }}
        >
          {tagline}
        </p>

        {/* Keywords */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.7rem",
            marginBottom: "2rem",
          }}
        >
          {keywords.map((kw) => (
            <span
              key={kw}
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.6)",
                padding: "0.5rem 1.2rem",
                borderRadius: "50px",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "var(--color-dark-text)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
              }}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          <a href="#countries" className="btn-primary">
            {ctaPrimary}
          </a>
          <a href="#about" className="btn-secondary">
            {ctaSecondary} ↓
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
                padding: "0.7rem 1.3rem",
                borderRadius: "50px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.9rem",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "var(--color-dark-text)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{statIcons[i]}</span>
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
