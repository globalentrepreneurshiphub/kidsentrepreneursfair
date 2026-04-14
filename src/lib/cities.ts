export const CITIES = {
  bogota: { name: "Bogotá", status: "open" as const, icon: "🏙️" },
  cali: { name: "Cali", status: "coming" as const, icon: "🌴" },
  medellin: { name: "Medellín", status: "coming" as const, icon: "🌿" },
  barranquilla: { name: "Barranquilla", status: "coming" as const, icon: "🌊" },
};

export type CitySlug = keyof typeof CITIES;

export const SUPPORTED_COUNTRIES = ["colombia"] as const;
export type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];
