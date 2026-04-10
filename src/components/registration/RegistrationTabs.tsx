"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const exhibitorSchema = z.object({
  parent_name: z.string().min(2),
  parent_id: z.string().min(3),
  parent_phone: z.string().min(7),
  parent_email: z.string().email(),
  child_name: z.string().min(2),
  child_age: z.number({ coerce: true }).min(5).max(17),
  business_name: z.string().min(2),
  business_description: z.string().min(20),
  business_category: z.string().min(1),
  video_url: z.string().url({ message: "Required — must be a valid Instagram URL" }),
  business_instagram: z.string().optional(),
  auth_data: z.boolean().refine((v) => v === true, { message: "Required" }),
  image_auth: z.boolean().refine((v) => v === true, { message: "Required" }),
});

const visitorSchema = z.object({
  parent_name: z.string().min(2),
  parent_id: z.string().min(3),
  parent_phone: z.string().min(7),
  parent_email: z.string().email(),
  child_name: z.string().min(2),
  child_age: z.number({ coerce: true }).min(1).max(17),
  siblings: z.boolean().optional(),
  siblings_details: z.string().optional(),
  auth_data: z.boolean().refine((v) => v === true, { message: "Required" }),
  image_auth: z.boolean().refine((v) => v === true, { message: "Required" }),
});

type ExhibitorForm = z.infer<typeof exhibitorSchema>;
type VisitorForm = z.infer<typeof visitorSchema>;

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  backgroundColor: "#0a1628",
  border: "1px solid rgba(212,160,23,0.2)",
  borderRadius: "0.5rem",
  color: "#FFFFFF",
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  boxSizing: "border-box" as const,
} as React.CSSProperties;

const labelStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "0.875rem",
  color: "rgba(255,255,255,0.7)",
  display: "block",
  marginBottom: "0.375rem",
} as React.CSSProperties;

const sectionTitle = {
  fontFamily: "var(--font-heading)",
  fontWeight: 700,
  fontSize: "0.8rem",
  color: "#D4A017",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: "1px solid rgba(212,160,23,0.15)",
};

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "#D4A017", marginLeft: "0.25rem" }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function AuthCheckbox({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
        {children}
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
          {label}
        </span>
      </label>
      {error && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem", marginLeft: "1.75rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const checkboxStyle = {
  width: "1rem",
  height: "1rem",
  marginTop: "0.2rem",
  accentColor: "#D4A017",
  flexShrink: 0,
} as React.CSSProperties;

export default function RegistrationTabs({
  locale,
  city,
  country,
}: {
  locale: string;
  city: string;
  country: string;
}) {
  const t = useTranslations("city.register");
  const [tab, setTab] = useState<"exhibitor" | "visitor">("exhibitor");
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState(false);

  const exhibitorForm = useForm<ExhibitorForm>({
    resolver: zodResolver(exhibitorSchema),
    defaultValues: { auth_data: false, image_auth: false },
  });

  const visitorForm = useForm<VisitorForm>({
    resolver: zodResolver(visitorSchema),
    defaultValues: { siblings: false, auth_data: false, image_auth: false },
  });

  const categories = locale === "es"
    ? ["Manualidades", "Tecnología", "Juguetes y juegos de mesa", "Libros y publicaciones", "Arte y diseño", "Moda y accesorios", "Productos ecológicos", "Otro"]
    : ["Crafts", "Technology", "Toys and board games", "Books and publications", "Art and design", "Fashion and accessories", "Eco-friendly products", "Other"];

  const siblingsValue = visitorForm.watch("siblings");

  async function onSubmitExhibitor(data: ExhibitorForm) {
    setApiError(false);
    try {
      const res = await fetch("/api/register/exhibitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, city, country, locale }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setApiError(true);
    }
  }

  async function onSubmitVisitor(data: VisitorForm) {
    setApiError(false);
    try {
      const res = await fetch("/api/register/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, city, country, locale }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setApiError(true);
    }
  }

  if (submitted) {
    return (
      <div className="card-dark" style={{ textAlign: "center", padding: "3rem", border: "1px solid rgba(34,197,94,0.3)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "#22c55e", marginBottom: "0.5rem" }}>
          {t("success")}
        </h3>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "0", backgroundColor: "#0a1628", borderRadius: "0.75rem", padding: "0.25rem", marginBottom: "2rem" }}>
        {(["exhibitor", "visitor"] as const).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => { setTab(tabKey); setApiError(false); }}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s",
              backgroundColor: tab === tabKey ? "#D4A017" : "transparent",
              color: tab === tabKey ? "#0a1628" : "rgba(255,255,255,0.4)",
            }}
          >
            {tabKey === "exhibitor" ? t("tab_exhibitor") : t("tab_visitor")}
          </button>
        ))}
      </div>

      {apiError && (
        <p style={{ fontFamily: "var(--font-body)", color: "#ef4444", marginBottom: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
          {t("error")}
        </p>
      )}

      {/* EXHIBITOR FORM */}
      {tab === "exhibitor" && (
        <form onSubmit={exhibitorForm.handleSubmit(onSubmitExhibitor)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card-dark" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={sectionTitle}>{t("parent_section")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field label={t("parent_name")} required error={exhibitorForm.formState.errors.parent_name?.message}>
                <input {...exhibitorForm.register("parent_name")} style={inputStyle} />
              </Field>
              <Field label={t("parent_id")} required error={exhibitorForm.formState.errors.parent_id?.message}>
                <input {...exhibitorForm.register("parent_id")} style={inputStyle} />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field label={t("parent_phone")} required error={exhibitorForm.formState.errors.parent_phone?.message}>
                <input {...exhibitorForm.register("parent_phone")} type="tel" style={inputStyle} />
              </Field>
              <Field label={t("parent_email")} required error={exhibitorForm.formState.errors.parent_email?.message}>
                <input {...exhibitorForm.register("parent_email")} type="email" style={inputStyle} />
              </Field>
            </div>
          </div>

          <div className="card-dark" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={sectionTitle}>{t("child_section")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field label={t("child_name")} required error={exhibitorForm.formState.errors.child_name?.message}>
                <input {...exhibitorForm.register("child_name")} style={inputStyle} />
              </Field>
              <Field label={t("child_age")} required error={exhibitorForm.formState.errors.child_age?.message}>
                <input {...exhibitorForm.register("child_age")} type="number" min={5} max={17} style={inputStyle} />
              </Field>
            </div>
          </div>

          <div className="card-dark" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={sectionTitle}>{t("business_section")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field label={t("business_name")} required error={exhibitorForm.formState.errors.business_name?.message}>
                <input {...exhibitorForm.register("business_name")} style={inputStyle} />
              </Field>
              <Field label={t("business_category")} required error={exhibitorForm.formState.errors.business_category?.message}>
                <select {...exhibitorForm.register("business_category")} style={{ ...inputStyle, appearance: "none" as const }}>
                  <option value="">—</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <Field label={t("business_description")} required error={exhibitorForm.formState.errors.business_description?.message}>
              <textarea {...exhibitorForm.register("business_description")} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </Field>
            <Field label={t("video_url")} required error={exhibitorForm.formState.errors.video_url?.message}>
              <input {...exhibitorForm.register("video_url")} type="url" placeholder="https://www.instagram.com/p/..." style={inputStyle} />
            </Field>
            <Field label={t("business_instagram")} error={exhibitorForm.formState.errors.business_instagram?.message}>
              <input {...exhibitorForm.register("business_instagram")} placeholder="@mybusiness" style={inputStyle} />
            </Field>
          </div>

          <div className="card-dark" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={sectionTitle}>{t("auth_section")}</p>
            <AuthCheckbox label={t("auth_data")} error={exhibitorForm.formState.errors.auth_data?.message}>
              <input type="checkbox" {...exhibitorForm.register("auth_data")} style={checkboxStyle} />
            </AuthCheckbox>
            <AuthCheckbox label={t("auth_image")} error={exhibitorForm.formState.errors.image_auth?.message}>
              <input type="checkbox" {...exhibitorForm.register("image_auth")} style={checkboxStyle} />
            </AuthCheckbox>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.25rem" }}>
              <a href="#" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#D4A017", textDecoration: "underline" }}>
                📄 {t("policy_link")}
              </a>
              <a href="#" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#D4A017", textDecoration: "underline" }}>
                📑 {t("terms_link")}
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={exhibitorForm.formState.isSubmitting}
            className="btn-primary"
            style={{ width: "100%", padding: "0.875rem", opacity: exhibitorForm.formState.isSubmitting ? 0.7 : 1, fontSize: "1rem" }}
          >
            {exhibitorForm.formState.isSubmitting ? "..." : t("submit_exhibitor")}
          </button>
        </form>
      )}

      {/* VISITOR FORM */}
      {tab === "visitor" && (
        <form onSubmit={visitorForm.handleSubmit(onSubmitVisitor)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card-dark" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={sectionTitle}>{t("parent_section")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field label={t("parent_name")} required error={visitorForm.formState.errors.parent_name?.message}>
                <input {...visitorForm.register("parent_name")} style={inputStyle} />
              </Field>
              <Field label={t("parent_id")} required error={visitorForm.formState.errors.parent_id?.message}>
                <input {...visitorForm.register("parent_id")} style={inputStyle} />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field label={t("parent_phone")} required error={visitorForm.formState.errors.parent_phone?.message}>
                <input {...visitorForm.register("parent_phone")} type="tel" style={inputStyle} />
              </Field>
              <Field label={t("parent_email")} required error={visitorForm.formState.errors.parent_email?.message}>
                <input {...visitorForm.register("parent_email")} type="email" style={inputStyle} />
              </Field>
            </div>
          </div>

          <div className="card-dark" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={sectionTitle}>{t("child_section")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field label={t("child_name")} required error={visitorForm.formState.errors.child_name?.message}>
                <input {...visitorForm.register("child_name")} style={inputStyle} />
              </Field>
              <Field label={t("child_age")} required error={visitorForm.formState.errors.child_age?.message}>
                <input {...visitorForm.register("child_age")} type="number" min={1} max={17} style={inputStyle} />
              </Field>
            </div>

            <div>
              <label style={labelStyle}>{t("siblings")}</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                {[{ value: false, label: t("siblings_no") }, { value: true, label: t("siblings_yes") }].map((opt) => (
                  <label key={String(opt.value)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                    <input
                      type="radio"
                      name="siblings"
                      value={String(opt.value)}
                      checked={siblingsValue === opt.value}
                      onChange={() => visitorForm.setValue("siblings", opt.value)}
                      style={{ accentColor: "#D4A017" }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {siblingsValue && (
              <Field label={t("siblings_details")} error={visitorForm.formState.errors.siblings_details?.message}>
                <textarea
                  {...visitorForm.register("siblings_details")}
                  rows={2}
                  placeholder={locale === "es" ? "Ej: Ana, 8 años; Carlos, 12 años" : "E.g.: Ana, 8 years; Carlos, 12 years"}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </Field>
            )}
          </div>

          <div className="card-dark" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={sectionTitle}>{t("auth_section")}</p>
            <AuthCheckbox label={t("auth_data")} error={visitorForm.formState.errors.auth_data?.message}>
              <input type="checkbox" {...visitorForm.register("auth_data")} style={checkboxStyle} />
            </AuthCheckbox>
            <AuthCheckbox label={t("auth_image")} error={visitorForm.formState.errors.image_auth?.message}>
              <input type="checkbox" {...visitorForm.register("image_auth")} style={checkboxStyle} />
            </AuthCheckbox>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.25rem" }}>
              <a href="#" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#D4A017", textDecoration: "underline" }}>
                📄 {t("policy_link")}
              </a>
              <a href="#" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#D4A017", textDecoration: "underline" }}>
                📑 {t("terms_link")}
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={visitorForm.formState.isSubmitting}
            className="btn-primary"
            style={{ width: "100%", padding: "0.875rem", opacity: visitorForm.formState.isSubmitting ? 0.7 : 1, fontSize: "1rem" }}
          >
            {visitorForm.formState.isSubmitting ? "..." : t("submit_visitor")}
          </button>
        </form>
      )}
    </div>
  );
}
