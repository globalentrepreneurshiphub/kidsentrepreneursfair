"use client";

import { useState } from "react";

interface StandVirtualSectionProps {
  locale: string;
}

export default function StandVirtualSection({ locale }: StandVirtualSectionProps) {
  const es = locale === "es";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !role) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/interest/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setRole("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const roles = es
    ? [
        { value: "familia", label: "👨‍👩‍👧 Familia emprendedora" },
        { value: "sponsor", label: "🏢 Sponsor / marca" },
        { value: "aliado", label: "🤝 Aliado / partner" },
      ]
    : [
        { value: "familia", label: "👨‍👩‍👧 Entrepreneur family" },
        { value: "sponsor", label: "🏢 Sponsor / brand" },
        { value: "aliado", label: "🤝 Partner / ally" },
      ];

  return (
    <section id="marketplace" className="sv-section">
      <div className="sv-container">
        <div className="sv-content">
          <span className="section-label" style={{ background: "var(--color-coral-soft)", color: "var(--color-coral)" }}>
            {es ? "Próximamente" : "Coming Soon"}
          </span>
          <h2 className="sv-title">
            🏪 Stand Virtual Kids
          </h2>
          <p className="sv-desc">
            {es
              ? "Tu stand no cierra cuando termina la feria. Stand Virtual Kids será el marketplace donde las familias venden los productos de sus hijos emprendedores online, todo el año."
              : "Your stand doesn't close when the fair ends. Stand Virtual Kids will be the marketplace where families sell their children's products online, all year round."}
          </p>

          <div className="sv-features">
            {(es
              ? [
                  { icon: "🌐", text: "Tienda online para cada emprendedor" },
                  { icon: "📦", text: "Vende tus productos todo el año" },
                  { icon: "🎨", text: "Perfil personalizado con tu marca" },
                  { icon: "📊", text: "Dashboard de ventas y métricas" },
                ]
              : [
                  { icon: "🌐", text: "Online store for every entrepreneur" },
                  { icon: "📦", text: "Sell your products all year long" },
                  { icon: "🎨", text: "Custom profile with your brand" },
                  { icon: "📊", text: "Sales and metrics dashboard" },
                ]
            ).map((f, i) => (
              <div key={i} className="sv-feature">
                <span className="sv-feature-icon">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sv-form-card">
          <div className="sv-form-header">
            <span className="sv-form-rocket">🚀</span>
            <p className="sv-form-title">
              {es ? "Sé de los primeros" : "Be among the first"}
            </p>
            <p className="sv-form-sub">
              {es
                ? "Déjanos tus datos y te avisamos cuando lancemos"
                : "Leave your details and we'll notify you at launch"}
            </p>
          </div>

          {status === "success" ? (
            <div className="sv-success">
              <span>🎉</span>
              <p>{es ? "¡Registrado! Te avisaremos cuando lancemos." : "Registered! We'll notify you at launch."}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="sv-form">
              <input
                type="text"
                className="form-input"
                placeholder={es ? "Tu nombre" : "Your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
              />
              <input
                type="email"
                className="form-input"
                placeholder={es ? "Tu email" : "Your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="sv-roles">
                {roles.map((r) => (
                  <label
                    key={r.value}
                    className={`sv-role ${role === r.value ? "sv-role-active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={role === r.value}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ display: "none" }}
                    />
                    {r.label}
                  </label>
                ))}
              </div>
              {status === "error" && (
                <p className="sv-error">
                  ⚠️ {es ? "Error al enviar. Intenta de nuevo." : "Failed to send. Please try again."}
                </p>
              )}
              <button type="submit" className="btn-primary sv-submit" disabled={status === "sending"}>
                {status === "sending" ? "..." : es ? "Quiero ser de los primeros" : "I want to be among the first"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .sv-section {
          padding: 5rem 2rem;
          background: white;
          overflow: hidden;
        }
        .sv-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .sv-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 1rem;
        }
        .sv-desc {
          font-size: 1rem;
          color: var(--color-body-text);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .sv-features {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sv-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--color-body-text);
          font-weight: 500;
        }
        .sv-feature-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--color-coral-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .sv-form-card {
          background: linear-gradient(145deg, var(--color-coral-soft), #FFF8F6);
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid rgba(255,107,107,0.2);
        }
        .sv-form-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .sv-form-rocket {
          font-size: 2rem;
        }
        .sv-form-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--color-dark-text);
          margin-top: 0.5rem;
        }
        .sv-form-sub {
          font-size: 0.85rem;
          color: var(--color-body-text);
          margin-top: 0.25rem;
        }
        .sv-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sv-roles {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .sv-role {
          display: block;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          border: 2px solid var(--color-border);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          color: var(--color-body-text);
        }
        .sv-role:hover {
          border-color: var(--color-coral);
        }
        .sv-role-active {
          border-color: var(--color-coral);
          background: white;
          color: var(--color-dark-text);
        }
        .sv-submit {
          padding: 0.9rem;
          font-size: 0.95rem;
          margin-top: 0.25rem;
        }
        .sv-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .sv-error {
          font-size: 0.8rem;
          color: var(--color-coral);
          font-weight: 600;
        }
        .sv-success {
          text-align: center;
          padding: 2rem 1rem;
        }
        .sv-success span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.75rem;
        }
        .sv-success p {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-coral);
        }
        @media (max-width: 768px) {
          .sv-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .sv-form-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
