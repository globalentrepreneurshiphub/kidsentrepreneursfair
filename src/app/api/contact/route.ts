import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  locale: z.string().optional().default("es"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("Supabase not configured — contact saved to log only.");
      console.log("[CONTACT]", data);
      return NextResponse.json({ success: true, warning: "Supabase not configured" });
    }

    const { getSupabaseAdmin } = await import("@/lib/supabase");
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("kef_contacts").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      locale: data.locale,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Kids Entrepreneurs Fair <noreply@kidsentrepreneursfair.com>",
          to: "hola@kidsentrepreneursfair.com",
          subject: `Nuevo mensaje de contacto — ${data.name}`,
          html: `
            <h2>Nuevo mensaje de ${data.name}</h2>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${data.message}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email failed (contact saved):", emailError);
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
