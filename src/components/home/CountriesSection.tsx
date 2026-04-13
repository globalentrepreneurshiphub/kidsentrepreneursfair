"use client";

import { useState } from "react";
import CitySelector from "./CitySelector";

interface ComingSoonCountry {
  flag: string;
  name: string;
}

interface CountriesSectionProps {
  locale: string;
  sectionLabel: string;
  title: string;
  subtitle: string;
  // Active country (Colombia)
  countryName: string;
  countryFlag: string;
  countryBadge: string;
  countryDesc: string;
  cities: Array<{ name: string; slug: string; icon: string; sub: string }>;
  // Coming soon
  comingSoonTitle: string;
  comingSoonCountries: ComingSoonCountry[];
  // City interest form
  formTitle: string;
  formSubtitle: string;
  formNameLabel: string;
  formEmailLabel: string;
  formCityLabel: string;
  formCountryLabel: string;
  formSubmitLabel: string;
  formSuccessMessage: string;
  formErrorMessage: string;
}

export default function CountriesSection({
  locale,
  sectionLabel,
  title,
  subtitle,
  countryName,
  countryFlag,
  countryBadge,
  countryDesc,
  cities,
  comingSoonTitle,
  comingSoonCountries,
  formTitle,
  formSubtitle,
  formNameLabel,
  formEmailLabel,
  formCityLabel,
  formCountryLabel,
  formSubmitLabel,
  formSuccessMessage,
  formErrorMessage,
}: CountriesSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !city.trim() || !country.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/interest/city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, city, country }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setCity(""); setCountry("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="countries" className="countries-section">
      <div className="countries-container">
        {/* Header */}
        <div className="countries-header">
          <span className="section-label" style={{ background: "var(--color-gold-soft)", color: "var(--color-gold)" }}>
            {sectionLabel}
          </span>
          <h2 className="countries-title">{title}</h2>
          <p className="countries-subtitle">{subtitle}</p>
        </div>

        {/* Active Country: Colombia */}
        <CitySelector
          locale={locale}
          countryName={countryName}
          countryFlag={countryFlag}
          countryBadge={countryBadge}
          countryDesc={countryDesc}
          cities={cities}
        />

        {/* Coming Soon Countries */}
        <div className="cs-coming-soon">
          <h3 className="cs-coming-title">🌎 {comingSoonTitle}</h3>
          <div className="cs-countries-grid">
            {comingSoonCountries.map((c) => (
              <div key={c.name} className="cs-country-card">
                <span className="cs-country-flag">{c.flag}</span>
                <span className="cs-country-name">{c.name}</span>
                <span className="cs-country-badge">
                  {locale === "es" ? "Próximamente" : "Coming Soon"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* City Interest Form */}
        <div className="cs-form-wrapper">
          <div className="cs-form-card">
            <div className="cs-form-header">
              <span className="cs-form-icon">🌍</span>
              <h3 className="cs-form-title">{formTitle}</h3>
              <p className="cs-form-subtitle">{formSubtitle}</p>
            </div>

            {status === "success" ? (
              <div className="cs-success">
                <span>🎉</span>
                <p>{formSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cs-form">
                <div className="cs-form-row">
                  <input
                    type="text"
                    className="form-input"
                    placeholder={formNameLabel}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                  />
                  <input
                    type="email"
                    className="form-input"
                    placeholder={formEmailLabel}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="cs-form-row">
                  <input
                    type="text"
                    className="form-input"
                    placeholder={formCityLabel}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder={formCountryLabel}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                {status === "error" && (
                  <p className="cs-error">
                    ⚠️ {formErrorMessage}
                  </p>
                )}
                <button type="submit" className="btn-primary cs-submit" disabled={status === "sending"}>
                  {status === "sending" ? "..." : formSubmitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .countries-section {
          padding: 5rem 2rem;
          background: var(--color-light-bg);
        }
        .countries-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .countries-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .countries-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 0.5rem;
        }
        .countries-subtitle {
          color: var(--color-body-text);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Coming Soon Grid */
        .cs-coming-soon {
          margin-top: 3rem;
          text-align: center;
        }
        .cs-coming-title {
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
        }
        .cs-countries-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .cs-country-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem 0.75rem;
          text-align: center;
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cs-country-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
        }
        .cs-country-flag {
          font-size: 2rem;
        }
        .cs-country-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-dark-text);
        }
        .cs-country-badge {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-gold);
          background: var(--color-gold-soft);
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
        }

        /* City Interest Form */
        .cs-form-wrapper {
          margin-top: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .cs-form-card {
          background: linear-gradient(145deg, var(--color-mint-soft, #E8F8F2), #F0FFF8);
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid rgba(86,201,168,0.2);
        }
        .cs-form-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .cs-form-icon {
          font-size: 2rem;
        }
        .cs-form-title {
          font-size: 1.2rem;
          color: var(--color-dark-text);
          margin-top: 0.5rem;
        }
        .cs-form-subtitle {
          font-size: 0.85rem;
          color: var(--color-body-text);
          margin-top: 0.25rem;
        }
        .cs-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .cs-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .cs-submit {
          padding: 0.9rem;
          font-size: 0.95rem;
          margin-top: 0.25rem;
        }
        .cs-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cs-error {
          font-size: 0.8rem;
          color: var(--color-coral);
          font-weight: 600;
        }
        .cs-success {
          text-align: center;
          padding: 2rem 1rem;
        }
        .cs-success span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.75rem;
        }
        .cs-success p {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-mint);
        }
        @media (max-width: 768px) {
          .cs-countries-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .cs-form-card {
            padding: 1.5rem;
          }
          .cs-form-row {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 480px) {
          .cs-countries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
