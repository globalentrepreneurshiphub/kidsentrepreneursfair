"use client";

interface CallSectionProps {
  sectionLabel: string;
  title: string;
  description: string;
  benefitsTitle: string;
  benefits: string[];
  cta: string;
  howTitle: string;
  howSteps: string[];
}

export default function CallSection({
  sectionLabel,
  title,
  description,
  benefitsTitle,
  benefits,
  cta,
  howTitle,
  howSteps,
}: CallSectionProps) {
  return (
    <section id="call" className="call-section">
      <div className="call-container">
        <div className="call-header">
          <span className="section-label" style={{ background: "var(--color-lavender-soft)", color: "var(--color-lavender)" }}>
            {sectionLabel}
          </span>
          <h2 className="call-title">{title}</h2>
          <p className="call-desc">{description}</p>
        </div>

        <div className="call-grid">
          {/* How it works */}
          <div className="call-how">
            <div className="call-how-header">
              <span>📱</span>
              <p>{howTitle}</p>
            </div>
            <ol className="call-how-list">
              {howSteps.map((step, i) => (
                <li key={i} className="call-how-step">
                  <div className="call-how-num">{i + 1}</div>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Benefits */}
          <div className="call-benefits">
            <p className="call-benefits-title">🏆 {benefitsTitle}</p>
            <ul className="call-benefits-list">
              {benefits.map((benefit, i) => (
                <li key={i} className="call-benefit-item">
                  <span className="call-check">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="call-cta-wrap">
          <a href="#countries" className="btn-primary call-cta-btn">
            {cta} →
          </a>
        </div>
      </div>

      <style>{`
        .call-section {
          padding: 5rem 2rem;
          background: var(--color-light-bg);
        }
        .call-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .call-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .call-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 1rem;
        }
        .call-desc {
          font-size: 1rem;
          color: var(--color-body-text);
          line-height: 1.8;
          max-width: 750px;
          margin: 0 auto;
        }
        .call-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        /* How it works card */
        .call-how {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-card);
        }
        .call-how-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding: 0.75rem 1rem;
          background: var(--color-lavender-soft);
          border-radius: 12px;
          border-left: 4px solid var(--color-lavender);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-lavender);
        }
        .call-how-header span:first-child {
          font-size: 1.3rem;
        }
        .call-how-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .call-how-step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          font-size: 0.9rem;
          color: var(--color-body-text);
          line-height: 1.6;
        }
        .call-how-num {
          width: 30px;
          height: 30px;
          min-width: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-lavender), #B89FE8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.85rem;
          color: white;
        }
        /* Benefits card */
        .call-benefits {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          border: 2px solid var(--color-gold);
          box-shadow: var(--shadow-card);
        }
        .call-benefits-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-gold);
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .call-benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .call-benefit-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
          font-size: 0.875rem;
          color: var(--color-body-text);
          line-height: 1.6;
        }
        .call-benefit-item:last-child {
          border-bottom: none;
        }
        .call-check {
          color: var(--color-mint);
          font-weight: 800;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .call-cta-wrap {
          text-align: center;
          margin-top: 2rem;
        }
        .call-cta-btn {
          padding: 1rem 3rem;
          font-size: 1.05rem;
        }
        @media (max-width: 768px) {
          .call-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
