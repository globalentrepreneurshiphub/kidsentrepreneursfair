import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const exhibitorSchema = z.object({
  parent_name: z.string().min(2),
  parent_email: z.string().email(),
  parent_phone: z.string().min(7),
  parent_id_number: z.string().min(5),
  child_name: z.string().min(2),
  child_age: z.number().min(4).max(17),
  business_name: z.string().min(2),
  business_description: z.string().min(10),
  business_category: z.string().min(1),
  business_instagram: z.string().optional(),
  video_url: z.string().url(),
  has_siblings: z.boolean().default(false),
  siblings_info: z.string().optional(),
  image_auth: z.boolean().refine((val) => val === true, {
    message: "Image authorization is required",
  }),
  data_auth: z.boolean().refine((val) => val === true, {
    message: "Data authorization is required",
  }),
  city: z.string(),
  country: z.string(),
  locale: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = exhibitorSchema.parse(body);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("Supabase not configured — registration saved to log only.");
      console.log("[EXHIBITOR REGISTRATION]", data);
      return NextResponse.json({ success: true, warning: "Supabase not configured" });
    }

    const { getSupabaseAdmin } = await import("@/lib/supabase");
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("kef_exhibitors").insert({
      parent_name: data.parent_name,
      parent_email: data.parent_email,
      parent_phone: data.parent_phone,
      parent_id_number: data.parent_id_number,
      child_name: data.child_name,
      child_age: data.child_age,
      business_name: data.business_name,
      business_description: data.business_description,
      business_category: data.business_category,
      business_instagram: data.business_instagram || null,
      video_url: data.video_url,
      has_siblings: data.has_siblings,
      siblings_info: data.siblings_info || null,
      image_auth: data.image_auth,
      data_auth: data.data_auth,
      city: data.city,
      country: data.country,
      locale: data.locale,
      status: "pending",
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const isSpanish = data.locale === "es";
        const subject = isSpanish
          ? `¡Recibimos tu postulación! — ${data.business_name}`
          : `We received your application! — ${data.business_name}`;
        const html = isSpanish
          ? `
            <h2>¡Hola ${data.parent_name}!</h2>
            <p>Recibimos la postulación de <strong>${data.child_name}</strong> con su emprendimiento <strong>${data.business_name}</strong>.</p>
            <p>Revisaremos tu solicitud y te contactaremos pronto.</p>
            <p>— El equipo de Kids Entrepreneurs Fair 🚀</p>
          `
          : `
            <h2>Hello ${data.parent_name}!</h2>
            <p>We received <strong>${data.child_name}</strong>'s application for their business <strong>${data.business_name}</strong>.</p>
            <p>We will review your application and contact you soon.</p>
            <p>— The Kids Entrepreneurs Fair team 🚀</p>
          `;
        await resend.emails.send({
          from: "Kids Entrepreneurs Fair <noreply@kidsentrepreneursfair.com>",
          to: data.parent_email,
          subject,
          html,
        });
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: err.errors }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
