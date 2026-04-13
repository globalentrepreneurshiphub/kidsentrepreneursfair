"use client";

import Link from "next/link";

interface City {
  name: string;
  slug: string;
  icon: string;
  sub: string;
}

interface CitySelectorProps {
  locale: string;
  countryName: string;
  countryFlag: string;
  countryBadge: string;
  countryDesc: string;
  cities: City[];
}

export default function CitySelector({
  locale,
  countryName,
  countryFlag,
  countryBadge,
  countryDesc,
  cities,
}: CitySelectorProps) {
  return (
    <div className="city-selector">
      <div className="city-selector-badge">{countryBadge.toUpperCase()}</div>

      <div className="city-selector-header">
        <span className="city-selector-flag">{countryFlag}</span>
        <div>
          <h3 className="city-selector-country">{countryName}</h3>
          <p className="city-selector-desc">{countryDesc}</p>
        </div>
      </div>

      <div className="city-selector-grid">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${locale}/colombia/${city.slug}`}
            className="city-card"
          >
            <span className="city-card-icon">{city.icon}</span>
            <h4 className="city-card-name">{city.name}</h4>
            <p className="city-card-sub">{city.sub}</p>
            <span className="city-card-arrow">→</span>
          </Link>
        ))}
      </div>

      <style>{`
        .city-selector {
          background: linear-gradient(135deg, var(--color-gold-soft), white);
          border: 2px solid var(--color-gold);
          border-radius: 24px;
          padding: 2.5rem;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          text-align: left;
        }
        .city-selector-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--color-gold);
          color: white;
          padding: 0.4rem 1.5rem;
          border-radius: 0 20px 0 16px;
          font-weight: 700;
          font-size: 0.8rem;
          font-family: var(--font-heading);
        }
        .city-selector-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .city-selector-flag {
          font-size: 3.5rem;
        }
        .city-selector-country {
          font-size: 1.8rem;
          margin-bottom: 0.2rem;
        }
        .city-selector-desc {
          color: var(--color-body-text);
          font-size: 0.95rem;
        }
        .city-selector-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .city-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem 1rem;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          position: relative;
        }
        .city-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(212,160,23,0.15);
        }
        .city-card-icon {
          font-size: 1.8rem;
          margin-bottom: 0.3rem;
        }
        .city-card-name {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--color-dark-text);
        }
        .city-card-sub {
          font-size: 0.75rem;
          color: var(--color-body-text);
        }
        .city-card-arrow {
          color: var(--color-gold);
          font-weight: 700;
          font-size: 1.1rem;
          margin-top: 0.3rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .city-card:hover .city-card-arrow {
          opacity: 1;
        }
        @media (max-width: 640px) {
          .city-selector {
            padding: 1.5rem;
          }
          .city-selector-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .city-selector-flag {
            font-size: 2.5rem;
          }
          .city-selector-country {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
