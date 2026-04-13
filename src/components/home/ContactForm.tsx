"use client";

import { useState } from "react";

interface ContactFormProps {
  sectionLabel: string;
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  sendLabel: string;
  successMessage: string;
  errorMessage: string;
  locale: string;
}

export default function ContactForm({
  sectionLabel,
  title,
  subtitle,
  nameLabel,
  emailLabel,
  messageLabel,
  sendLabel,
  successMessage,
  errorMessage,
  locale,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <span className="section-label" style={{ background: "var(--color-mint-soft)", color: "var(--color-mint)" }}>
            {sectionLabel}
          </span>
          <h2 className="contact-title">{title}</h2>
          <p className="contact-subtitle">{subtitle}</p>
        </div>

        <div className="contact-card">
          {status === "success" ? (
            <div className="contact-success">
              <span className="contact-success-icon">✅</span>
              <p className="contact-success-msg">{successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-row">
                <div className="contact-field">
                  <label className="contact-label">
                    {nameLabel} <span className="contact-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-label">
                    {emailLabel} <span className="contact-required">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="contact-field">
                <label className="contact-label">
                  {messageLabel} <span className="contact-required">*</span>
                </label>
                <textarea
                  rows={5}
                  className="form-input"
                  style={{ resize: "vertical" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  minLength={10}
                />
              </div>

              {status === "error" && (
                <div className="contact-error">
                  <span>⚠️</span> {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary contact-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "..." : sendLabel}
              </button>
            </form>
          )}
        </div>

        <div className="contact-info">
          <a href="mailto:globalentrepreneurshiphubuae@gmail.com" className="contact-info-item">
            ✉️ globalentrepreneurshiphubuae@gmail.com
          </a>
          <a href="https://www.instagram.com/kidsentrepreneursfair" target="_blank" rel="noopener noreferrer" className="contact-info-item">
            📸 @kidsentrepreneursfair
          </a>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 5rem 2rem;
          background: white;
        }
        .contact-container {
          max-width: 700px;
          margin: 0 auto;
        }
        .contact-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .contact-title {
          font-size: clamp(1.75rem, 4vw, 2rem);
          margin-bottom: 0.5rem;
        }
        .contact-subtitle {
          color: var(--color-body-text);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .contact-card {
          background: var(--color-light-bg);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid var(--color-border);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .contact-label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-dark-text);
        }
        .contact-required {
          color: var(--color-coral);
        }
        .contact-submit {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
        .contact-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact-error {
          background: var(--color-coral-soft);
          color: var(--color-coral);
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .contact-success {
          text-align: center;
          padding: 2rem;
        }
        .contact-success-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 1rem;
        }
        .contact-success-msg {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: var(--color-mint);
          font-weight: 700;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .contact-info-item {
          color: var(--color-body-text);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .contact-info-item:hover {
          color: var(--color-gold);
        }
        @media (max-width: 520px) {
          .contact-row {
            grid-template-columns: 1fr;
          }
          .contact-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
