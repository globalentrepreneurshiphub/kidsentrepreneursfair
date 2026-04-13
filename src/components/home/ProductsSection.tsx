"use client";

interface Category {
  icon: string;
  label: string;
}

interface ProductsSectionProps {
  sectionLabel: string;
  title: string;
  categories: Category[];
  note: string;
}

export default function ProductsSection({
  sectionLabel,
  title,
  categories,
  note,
}: ProductsSectionProps) {
  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <div className="products-header">
          <span className="section-label" style={{ background: "var(--color-peach-soft)", color: "var(--color-peach)" }}>
            {sectionLabel}
          </span>
          <h2 className="products-title">{title}</h2>
        </div>

        <div className="products-grid">
          {categories.map((cat, i) => {
            const colors = [
              "var(--color-gold)", "var(--color-sky)", "var(--color-coral)",
              "var(--color-lavender)", "var(--color-peach)", "var(--color-mint)", "var(--color-gold)",
            ];
            const bgs = [
              "var(--color-gold-soft)", "var(--color-sky-soft)", "var(--color-coral-soft)",
              "var(--color-lavender-soft)", "var(--color-peach-soft)", "var(--color-mint-soft)", "var(--color-gold-soft)",
            ];
            return (
              <div
                key={i}
                className="product-card"
                style={{ borderBottom: `3px solid ${colors[i]}` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
              >
                <div className="product-icon" style={{ background: bgs[i] }}>
                  {cat.icon}
                </div>
                <span className="product-label">{cat.label}</span>
              </div>
            );
          })}
        </div>

        <div className="products-note">
          <span className="products-note-icon">⚠️</span>
          <p className="products-note-text">{note}</p>
        </div>
      </div>

      <style>{`
        .products-section {
          padding: 5rem 2rem;
          background: white;
        }
        .products-container {
          max-width: 850px;
          margin: 0 auto;
        }
        .products-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .products-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .product-card {
          background: var(--color-light-bg);
          padding: 1.5rem 1.2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: var(--shadow-card);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .product-icon {
          width: 55px;
          height: 55px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 0.75rem;
        }
        .product-label {
          font-size: 0.875rem;
          color: var(--color-body-text);
          font-weight: 600;
          line-height: 1.4;
        }
        .products-note {
          background: var(--color-coral-soft);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border-left: 4px solid var(--color-coral);
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .products-note-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .products-note-text {
          font-size: 0.875rem;
          color: var(--color-coral);
          line-height: 1.5;
          font-weight: 600;
        }
        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
