import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const visitorSchema = z.object({
  parent_name: z.string().min(2),
  parent_email: z.string().email(),
  parent_phone: z.string().min(7),
  child_name: z.string().min(2),
  child_age: z.number().min(5).max(17),
  image_auth: z.boolean(),
  city: z.string(),
  country: z.string(),
  locale: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = visitorSchema.parse(body);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("Supabase not configured — registration saved to log only.");
      console.log("[VISITOR REGISTRATION]", data);
      return NextResponse.json({ success: true, warning: "Supabase not configured" });
    }

    const { getSupabaseAdmin } = await import("@/lib/supabase");
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("visitors").insert({
      parent_name: data.parent_name,
      parent_email: data.parent_email,
      parent_phone: data.parent_phone,
      child_name: data.child_name,
      child_age: data.child_age,
      image_auth: data.image_auth,
      city: data.city,
      country: data.country,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Kids Entrepreneurs Fair <noreply@kidsentrepreneursfair.com>",
        to: data.parent_email,
        subject: "¡Te registraste como visitante! — Kids Entrepreneurs Fair",
        html: `
          <h2>¡Hola ${data.parent_name}!</h2>
          <p>Gracias por registrarte. <strong>${data.child_name}</strong> ya está en nuestra lista de visitantes para <strong>${data.city}</strong>.</p>
          <p>Te enviaremos los detalles del evento pronto.</p>
          <p>— El equipo de Kids Entrepreneurs Fair 🚀</p>
        `,
      });
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
