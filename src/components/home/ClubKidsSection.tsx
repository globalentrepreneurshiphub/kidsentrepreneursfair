"use client";

import { useState } from "react";

interface ClubKidsSectionProps {
  locale: string;
}

export default function ClubKidsSection({ locale }: ClubKidsSectionProps) {
  const es = locale === "es";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [childAge, setChildAge] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !childAge) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/interest/club", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, child_age: childAge }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setChildAge("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const benefits = es
    ? [
        { icon: "🎓", text: "Talleres mensuales de emprendimiento" },
        { icon: "👨‍🏫", text: "Mentorías con emprendedores reales" },
        { icon: "🎪", text: "Eventos exclusivos para miembros" },
        { icon: "🌎", text: "Comunidad global de niños emprendedores" },
        { icon: "📜", text: "Certificaciones y reconocimientos" },
      ]
    : [
        { icon: "🎓", text: "Monthly entrepreneurship workshops" },
        { icon: "👨‍🏫", text: "Mentoring with real entrepreneurs" },
        { icon: "🎪", text: "Exclusive events for members" },
        { icon: "🌎", text: "Global community of kid entrepreneurs" },
        { icon: "📜", text: "Certifications and awards" },
      ];

  return (
    <section id="clubkids" className="ck-section">
      <div className="ck-container">
        <div className="ck-header">
          <span className="section-label" style={{ background: "var(--color-lavender-soft)", color: "var(--color-lavender)" }}>
            {es ? "Próximamente" : "Coming Soon"}
          </span>
          <h2 className="ck-title">👑 Club Kids</h2>
          <p className="ck-subtitle">
            {es
              ? "La feria fue solo el comienzo. Club Kids es la comunidad donde los niños emprendedores siguen creciendo juntos."
              : "The fair was just the beginning. Club Kids is the community where kid entrepreneurs keep growing together."}
          </p>
        </div>

        <div className="ck-grid">
          <div className="ck-benefits">
            {benefits.map((b, i) => (
              <div key={i} className="ck-benefit">
                <div className="ck-benefit-icon">{b.icon}</div>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          <div className="ck-form-card">
            <div className="ck-form-header">
              <span className="ck-crown">👑</span>
              <p className="ck-form-title">
                {es ? "Únete a la lista de espera" : "Join the waitlist"}
              </p>
            </div>

            {status === "success" ? (
              <div className="ck-success">
                <span>🌟</span>
                <p>{es ? "¡Anotado! Te avisaremos cuando Club Kids abra sus puertas." : "Noted! We'll notify you when Club Kids opens."}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ck-form">
                <input
                  type="text"
                  className="form-input"
                  placeholder={es ? "Nombre del padre/madre" : "Parent name"}
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
                <select
                  className="form-input"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  required
                  style={{ cursor: "pointer" }}
                >
                  <option value="">{es ? "Edad del niño" : "Child's age"}</option>
                  <option value="4-6">4-6 {es ? "años" : "years"}</option>
                  <option value="7-9">7-9 {es ? "años" : "years"}</option>
                  <option value="10-12">10-12 {es ? "años" : "years"}</option>
                  <option value="13-15">13-15 {es ? "años" : "years"}</option>
                  <option value="16+">16+ {es ? "años" : "years"}</option>
                </select>
                {status === "error" && (
                  <p className="ck-error">
                    ⚠️ {es ? "Error al enviar. Intenta de nuevo." : "Failed to send. Please try again."}
                  </p>
                )}
                <button type="submit" className="btn-primary ck-submit" disabled={status === "sending"}>
                  {status === "sending" ? "..." : es ? "Quiero unirme cuando lance" : "Join me when it launches"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .ck-section {
          padding: 5rem 2rem;
          background: var(--color-light-bg);
        }
        .ck-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ck-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .ck-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 0.75rem;
        }
        .ck-subtitle {
          font-size: 1.05rem;
          color: var(--color-body-text);
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .ck-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .ck-benefits {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 1rem;
        }
        .ck-benefit {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.95rem;
          color: var(--color-body-text);
          font-weight: 500;
        }
        .ck-benefit-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--color-lavender-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .ck-form-card {
          background: linear-gradient(145deg, var(--color-lavender-soft), #F8F5FF);
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid rgba(155,127,212,0.2);
        }
        .ck-form-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .ck-crown {
          font-size: 2rem;
        }
        .ck-form-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--color-dark-text);
          margin-top: 0.5rem;
        }
        .ck-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ck-submit {
          padding: 0.9rem;
          font-size: 0.95rem;
          margin-top: 0.25rem;
        }
        .ck-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .ck-error {
          font-size: 0.8rem;
          color: var(--color-coral);
          font-weight: 600;
        }
        .ck-success {
          text-align: center;
          padding: 2rem 1rem;
        }
        .ck-success span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.75rem;
        }
        .ck-success p {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-lavender);
        }
        @media (max-width: 768px) {
          .ck-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .ck-form-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
