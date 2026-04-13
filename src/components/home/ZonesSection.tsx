"use client";

import { useState } from "react";

interface ZoneItem {
  number: string;
  icon: string;
  name: string;
  location: string;
  description: string;
  details: string[];
}

interface ZonesSectionProps {
  sectionLabel: string;
  title: string;
  subtitle: string;
  items: ZoneItem[];
}

const ZONE_COLORS = ["var(--color-gold)", "var(--color-coral)", "var(--color-mint)", "var(--color-lavender)"];
const ZONE_BG = ["var(--color-gold-soft)", "var(--color-coral-soft)", "var(--color-mint-soft)", "var(--color-lavender-soft)"];

export default function ZonesSection({ sectionLabel, title, subtitle, items }: ZonesSectionProps) {
  const [activeZone, setActiveZone] = useState(0);

  return (
    <section id="zones" className="zones-section">
      <div className="zones-container">
        <div className="zones-header">
          <span className="section-label" style={{ background: "var(--color-mint-soft)", color: "var(--color-mint)" }}>
            {sectionLabel}
          </span>
          <h2 className="zones-title">{title}</h2>
          <p className="zones-subtitle">{subtitle}</p>
        </div>

        {/* Zone tabs */}
        <div className="zones-tabs">
          {items.map((zone, idx) => (
            <button
              key={zone.number}
              className={`zones-tab ${activeZone === idx ? "zones-tab-active" : ""}`}
              style={{
                borderColor: activeZone === idx ? ZONE_COLORS[idx] : "var(--color-border)",
                background: activeZone === idx ? ZONE_BG[idx] : "white",
              }}
              onClick={() => setActiveZone(idx)}
            >
              <span className="zones-tab-icon">{zone.icon}</span>
              <span className="zones-tab-num" style={{ color: ZONE_COLORS[idx] }}>{zone.number}</span>
            </button>
          ))}
        </div>

        {/* Zone detail */}
        <div className="zones-detail" style={{ borderLeft: `4px solid ${ZONE_COLORS[activeZone]}` }}>
          <div className="zones-detail-header">
            <div
              className="zones-detail-number"
              style={{ background: ZONE_COLORS[activeZone] }}
            >
              {items[activeZone].number}
            </div>
            <div>
              <span className="zones-detail-icon">{items[activeZone].icon}</span>
              <h3 className="zones-detail-name">{items[activeZone].name}</h3>
              <p className="zones-detail-location">{items[activeZone].location}</p>
            </div>
          </div>

          <p className="zones-detail-desc">{items[activeZone].description}</p>

          {items[activeZone].details.length > 0 && (
            <ul className="zones-detail-list">
              {items[activeZone].details.map((d, i) => (
                <li key={i} className="zones-detail-item">
                  <span className="zones-detail-arrow" style={{ color: ZONE_COLORS[activeZone] }}>→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* All zones - mobile stacked */}
        <div className="zones-stacked">
          {items.map((zone, idx) => (
            <div key={zone.number} className="zones-card" style={{ borderLeft: `4px solid ${ZONE_COLORS[idx]}` }}>
              <div className="zones-card-header">
                <div className="zones-card-number" style={{ background: ZONE_COLORS[idx] }}>
                  {zone.number}
                </div>
                <div>
                  <span className="zones-card-icon">{zone.icon}</span>
                  <h3 className="zones-card-name">{zone.name}</h3>
                </div>
              </div>
              <p className="zones-card-location">{zone.location}</p>
              <p className="zones-card-desc">{zone.description}</p>
              {zone.details.length > 0 && (
                <ul className="zones-card-list">
                  {zone.details.map((d, i) => (
                    <li key={i} className="zones-card-item">
                      <span style={{ color: ZONE_COLORS[idx], fontWeight: 800, flexShrink: 0 }}>→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .zones-section {
          padding: 5rem 2rem;
          background: white;
        }
        .zones-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .zones-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .zones-title {
          font-size: clamp(1.75rem, 4vw, 2.2rem);
          margin-bottom: 0.5rem;
        }
        .zones-subtitle {
          color: var(--color-body-text);
          max-width: 580px;
          margin: 0 auto;
        }

        /* Tab navigation - desktop */
        .zones-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .zones-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 1rem 1.5rem;
          border-radius: 16px;
          border: 2px solid var(--color-border);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-heading);
        }
        .zones-tab:hover {
          transform: translateY(-2px);
        }
        .zones-tab-active {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .zones-tab-icon {
          font-size: 1.5rem;
        }
        .zones-tab-num {
          font-weight: 800;
          font-size: 0.9rem;
        }

        /* Detail panel - desktop */
        .zones-detail {
          background: var(--color-light-bg);
          border-radius: 20px;
          padding: 2.5rem;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .zones-detail-header {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          margin-bottom: 1.25rem;
        }
        .zones-detail-number {
          width: 45px;
          height: 45px;
          min-width: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.2rem;
          color: white;
        }
        .zones-detail-icon {
          font-size: 1.5rem;
        }
        .zones-detail-name {
          font-size: 1.25rem;
          color: var(--color-dark-text);
          margin-top: 0.2rem;
        }
        .zones-detail-location {
          font-size: 0.8rem;
          color: var(--color-body-text);
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 0.2rem;
        }
        .zones-detail-desc {
          font-size: 0.95rem;
          color: var(--color-body-text);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .zones-detail-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .zones-detail-item {
          font-size: 0.875rem;
          color: var(--color-body-text);
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          line-height: 1.6;
        }
        .zones-detail-arrow {
          font-weight: 800;
          flex-shrink: 0;
        }

        /* Stacked - mobile only */
        .zones-stacked {
          display: none;
          flex-direction: column;
          gap: 1.5rem;
        }
        .zones-card {
          background: var(--color-light-bg);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .zones-card-header {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .zones-card-number {
          width: 38px;
          height: 38px;
          min-width: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          color: white;
        }
        .zones-card-icon {
          font-size: 1.2rem;
          margin-right: 0.3rem;
        }
        .zones-card-name {
          font-size: 1.1rem;
          color: var(--color-dark-text);
        }
        .zones-card-location {
          font-size: 0.75rem;
          color: var(--color-body-text);
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        .zones-card-desc {
          font-size: 0.9rem;
          color: var(--color-body-text);
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }
        .zones-card-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .zones-card-item {
          font-size: 0.8rem;
          color: var(--color-body-text);
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .zones-tabs, .zones-detail { display: none; }
          .zones-stacked { display: flex; }
        }
      `}</style>
    </section>
  );
}
