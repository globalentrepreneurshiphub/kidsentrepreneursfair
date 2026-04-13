"use client";

interface AboutStat {
  value: string;
  label: string;
}

interface AboutSectionProps {
  sectionLabel: string;
  title: string;
  description: string;
  description2: string;
  stats: AboutStat[];
}

export default function AboutSection({
  sectionLabel,
  title,
  description,
  description2,
  stats,
}: AboutSectionProps) {
  return (
    <section id="about-detail" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <span className="section-label" style={{ background: "var(--color-gold-soft)", color: "var(--color-gold)" }}>
            {sectionLabel}
          </span>
          <h2 className="about-title">{title}</h2>
        </div>

        <div className="about-content">
          <div className="about-icon-row">
            <span className="about-icon">🎪</span>
            <span className="about-icon">🤖</span>
            <span className="about-icon">🚀</span>
          </div>
          <p className="about-desc">{description}</p>
          <p className="about-desc2">{description2}</p>
        </div>

        <div className="about-stats-grid">
          {stats.map((stat, i) => {
            const colors = ["var(--color-gold)", "var(--color-coral)", "var(--color-mint)"];
            const bgs = ["var(--color-gold-soft)", "var(--color-coral-soft)", "var(--color-mint-soft)"];
            const icons = ["🌎", "📅", "🎟️"];
            return (
              <div key={i} className="about-stat-card" style={{ borderTop: `3px solid ${colors[i]}` }}>
                <div className="about-stat-icon" style={{ background: bgs[i] }}>
                  {icons[i]}
                </div>
                <p className="about-stat-value" style={{ color: colors[i] }}>{stat.value}</p>
                <p className="about-stat-label">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 5rem 2rem;
          background: white;
          position: relative;
        }
        .about-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .about-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .about-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 0;
        }
        .about-content {
          text-align: center;
          margin-bottom: 3rem;
        }
        .about-icon-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .about-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          background: var(--color-light-bg);
        }
        .about-desc {
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 1rem;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }
        .about-desc2 {
          font-size: 0.95rem;
          color: var(--color-body-text);
          line-height: 1.8;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          padding: 1rem 1.5rem;
          background: var(--color-gold-soft);
          border-radius: 12px;
          border-left: 4px solid var(--color-gold);
        }
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .about-stat-card {
          text-align: center;
          padding: 1.5rem;
          background: var(--color-light-bg);
          border-radius: 16px;
          transition: transform 0.3s ease;
        }
        .about-stat-card:hover {
          transform: translateY(-3px);
        }
        .about-stat-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          margin: 0 auto 0.75rem;
        }
        .about-stat-value {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.4rem;
          margin-bottom: 0.2rem;
        }
        .about-stat-label {
          font-size: 0.8rem;
          color: var(--color-body-text);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        @media (max-width: 640px) {
          .about-stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
