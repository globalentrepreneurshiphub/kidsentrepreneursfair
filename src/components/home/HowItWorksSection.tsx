"use client";

interface Step {
  n: string;
  title: string;
  desc: string;
}

interface HowItWorksSectionProps {
  sectionLabel: string;
  title: string;
  exhibitorTitle: string;
  exhibitorSteps: Step[];
  visitorTitle: string;
  visitorSteps: Step[];
}

export default function HowItWorksSection({
  sectionLabel,
  title,
  exhibitorTitle,
  exhibitorSteps,
  visitorTitle,
  visitorSteps,
}: HowItWorksSectionProps) {
  const tracks = [
    {
      label: exhibitorTitle,
      steps: exhibitorSteps,
      color: "var(--color-gold)",
      colorLight: "var(--color-gold-light)",
      bg: "var(--color-gold-soft)",
      icon: "⭐",
    },
    {
      label: visitorTitle,
      steps: visitorSteps,
      color: "var(--color-mint)",
      colorLight: "#7ED8BF",
      bg: "var(--color-mint-soft)",
      icon: "🎟️",
    },
  ];

  return (
    <section id="howto" className="howto-section">
      <div className="howto-container">
        <div className="howto-header">
          <span className="section-label" style={{ background: "var(--color-gold-soft)", color: "var(--color-gold)" }}>
            {sectionLabel}
          </span>
          <h2 className="howto-title">{title}</h2>
        </div>

        <div className="howto-grid">
          {tracks.map((track) => (
            <div key={track.label} className="howto-track">
              <div className="howto-track-header" style={{ background: track.bg, borderLeft: `4px solid ${track.color}` }}>
                <span className="howto-track-icon">{track.icon}</span>
                <p className="howto-track-label" style={{ color: track.color }}>
                  {track.label}
                </p>
              </div>
              <div className="howto-steps">
                {track.steps.map((step, idx) => (
                  <div key={step.n} className="howto-step">
                    <div className="howto-step-line">
                      <div
                        className="howto-step-dot"
                        style={{ background: `linear-gradient(135deg, ${track.color}, ${track.colorLight})` }}
                      >
                        {step.n}
                      </div>
                      {idx < track.steps.length - 1 && (
                        <div className="howto-step-connector" style={{ background: track.bg }} />
                      )}
                    </div>
                    <div className="howto-step-content">
                      <p className="howto-step-title">{step.title}</p>
                      <p className="howto-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .howto-section {
          padding: 5rem 2rem;
          background: var(--color-light-bg);
        }
        .howto-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .howto-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .howto-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
        }
        .howto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
        }
        .howto-track-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }
        .howto-track-icon {
          font-size: 1.3rem;
        }
        .howto-track-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .howto-steps {
          display: flex;
          flex-direction: column;
        }
        .howto-step {
          display: flex;
          gap: 1.25rem;
        }
        .howto-step-line {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .howto-step-dot {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          color: white;
          z-index: 1;
        }
        .howto-step-connector {
          width: 3px;
          flex: 1;
          min-height: 20px;
          border-radius: 2px;
        }
        .howto-step-content {
          padding-bottom: 1.5rem;
        }
        .howto-step-title {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-dark-text);
          margin-bottom: 0.3rem;
        }
        .howto-step-desc {
          font-size: 0.875rem;
          color: var(--color-body-text);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .howto-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
