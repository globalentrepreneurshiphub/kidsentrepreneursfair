"use client";

interface SponsorsSectionProps {
  locale: string;
  sectionLabel: string;
  title: string;
  subtitle: string;
  organizerLabel: string;
  organizerName: string;
  organizerDesc: string;
  ctaText: string;
}

export default function SponsorsSection({
  locale,
  sectionLabel,
  title,
  subtitle,
  organizerLabel,
  organizerName,
  organizerDesc,
  ctaText,
}: SponsorsSectionProps) {
  const es = locale === "es";

  function handleSponsorCTA() {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const textarea = contactSection.querySelector("textarea");
        if (textarea) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype, "value"
          )?.set;
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(textarea, es
              ? "Hola, me interesa ser sponsor de Kids Entrepreneurs Fair"
              : "Hello, I'm interested in sponsoring Kids Entrepreneurs Fair"
            );
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }
      }, 600);
    }
  }

  return (
    <section id="sponsors" className="sponsors-section">
      <div className="sponsors-container">
        {/* Header */}
        <div className="sponsors-header">
          <span className="section-label" style={{ background: "var(--color-sky-soft)", color: "var(--color-sky)" }}>
            {sectionLabel}
          </span>
          <h2 className="sponsors-title">{title}</h2>
          <p className="sponsors-subtitle">{subtitle}</p>
        </div>

        {/* Organizer Card */}
        <div className="sponsors-organizer">
          <div className="sponsors-org-badge">{organizerLabel}</div>
          <div className="sponsors-org-content">
            <div className="sponsors-org-logo">
              <span className="sponsors-org-icon">🌐</span>
            </div>
            <div>
              <h3 className="sponsors-org-name">{organizerName}</h3>
              <p className="sponsors-org-desc">{organizerDesc}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="sponsors-cta-wrap">
          <button onClick={handleSponsorCTA} className="btn-primary sponsors-cta-btn">
            {ctaText}
          </button>
        </div>
      </div>

      <style>{`
        .sponsors-section {
          padding: 5rem 2rem;
          background: white;
          text-align: center;
        }
        .sponsors-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .sponsors-header {
          margin-bottom: 2.5rem;
        }
        .sponsors-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 0.75rem;
        }
        .sponsors-subtitle {
          color: var(--color-body-text);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
          font-size: 1rem;
        }

        /* Organizer Card */
        .sponsors-organizer {
          background: linear-gradient(145deg, var(--color-sky-soft, #E0F2FE), #F0F9FF);
          border-radius: 24px;
          padding: 2.5rem;
          border: 2px solid rgba(92,184,230,0.3);
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }
        .sponsors-org-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--color-sky);
          color: white;
          padding: 0.4rem 1.5rem;
          border-radius: 0 20px 0 16px;
          font-weight: 700;
          font-size: 0.8rem;
          font-family: var(--font-heading);
          text-transform: uppercase;
        }
        .sponsors-org-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          text-align: left;
        }
        .sponsors-org-logo {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }
        .sponsors-org-icon {
          display: block;
        }
        .sponsors-org-name {
          font-size: 1.15rem;
          color: var(--color-dark-text);
          margin-bottom: 0.3rem;
        }
        .sponsors-org-desc {
          font-size: 0.9rem;
          color: var(--color-body-text);
          line-height: 1.6;
        }

        /* CTA */
        .sponsors-cta-wrap {
          margin-top: 2.5rem;
        }
        .sponsors-cta-btn {
          padding: 1rem 2.5rem;
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .sponsors-organizer {
            padding: 1.5rem;
            padding-top: 2.5rem;
          }
          .sponsors-org-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
