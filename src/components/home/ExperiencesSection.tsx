"use client";

interface ExperiencesSectionProps {
  sectionLabel: string;
  title: string;
  subtitle: string;
  exhibitor: {
    title: string;
    credential: string;
    description: string;
    cta: string;
  };
  visitor: {
    title: string;
    credential: string;
    description: string;
    benefits: string[];
    cta: string;
  };
}

export default function ExperiencesSection({
  sectionLabel,
  title,
  subtitle,
  exhibitor,
  visitor,
}: ExperiencesSectionProps) {
  return (
    <section id="experiences" className="exp-section">
      <div className="exp-container">
        <div className="exp-header">
          <span className="section-label" style={{ background: "var(--color-coral-soft)", color: "var(--color-coral)" }}>
            {sectionLabel}
          </span>
          <h2 className="exp-title">{title}</h2>
          <p className="exp-subtitle">{subtitle}</p>
        </div>

        <div className="exp-grid">
          {/* Exhibitor card */}
          <div className="exp-card exp-card-exhibitor">
            <div className="exp-card-badge" style={{ background: "var(--color-gold-soft)", color: "var(--color-gold)" }}>
              🥇 {exhibitor.credential}
            </div>
            <div className="exp-card-icon" style={{ background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-light))" }}>
              ⭐
            </div>
            <h3 className="exp-card-title">{exhibitor.title}</h3>
            <p className="exp-card-desc">{exhibitor.description}</p>
            <a href="#call" className="btn-primary exp-card-cta">
              {exhibitor.cta} →
            </a>
          </div>

          {/* Visitor card */}
          <div className="exp-card exp-card-visitor">
            <div className="exp-card-badge" style={{ background: "var(--color-mint-soft)", color: "var(--color-mint)" }}>
              🎟️ {visitor.credential}
            </div>
            <div className="exp-card-icon" style={{ background: "linear-gradient(135deg, var(--color-mint), #7ED8BF)" }}>
              🎪
            </div>
            <h3 className="exp-card-title">{visitor.title}</h3>
            <p className="exp-card-desc">{visitor.description}</p>
            <ul className="exp-benefits">
              {visitor.benefits.map((b, i) => (
                <li key={i} className="exp-benefit-item">
                  <span className="exp-check">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#countries" className="btn-secondary exp-card-cta">
              {visitor.cta} →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .exp-section {
          padding: 5rem 2rem;
          background: var(--color-light-bg);
        }
        .exp-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .exp-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .exp-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 0.5rem;
        }
        .exp-subtitle {
          color: var(--color-body-text);
          font-size: 1.05rem;
        }
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .exp-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: var(--shadow-card);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .exp-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }
        .exp-card-exhibitor {
          border: 2px solid var(--color-gold);
        }
        .exp-card-exhibitor::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
        }
        .exp-card-visitor {
          border: 1px solid var(--color-border);
        }
        .exp-card-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          align-self: flex-start;
        }
        .exp-card-icon {
          width: 55px;
          height: 55px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        .exp-card-title {
          font-size: 1.35rem;
          color: var(--color-dark-text);
        }
        .exp-card-desc {
          font-size: 0.95rem;
          color: var(--color-body-text);
          line-height: 1.7;
        }
        .exp-benefits {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .exp-benefit-item {
          font-size: 0.875rem;
          color: var(--color-body-text);
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .exp-check {
          color: var(--color-mint);
          font-weight: 800;
          flex-shrink: 0;
        }
        .exp-card-cta {
          text-align: center;
          padding: 0.75rem 2rem;
          font-size: 0.95rem;
          margin-top: auto;
        }
      `}</style>
    </section>
  );
}
