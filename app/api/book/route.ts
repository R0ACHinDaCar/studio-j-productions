import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";



const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, location, date, upgrades, details } = body;

    // Validate required fields
    if (!name || !email || !service || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("leads").insert([{
      name, email, phone, service, location, date,
      budget: Array.isArray(upgrades) ? upgrades.join(", ") : upgrades,
      details,
    }]);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Send notification email to Jake
    await resend.emails.send({
      from: "Studio J Productions <noreply@studiojproductions.net>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Inquiry — ${service} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #111111; margin: 0; padding: 40px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 520px; background: #F8F6F2; border-radius: 4px; overflow: hidden;">

                  <tr>
                    <td style="background: #111111; padding: 32px 40px;">
                      <img src="https://www.studiojproductions.net/logo-white.png" alt="Studio J Productions" width="110" style="display:block;" />
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 40px 40px 16px;">
                      <p style="margin: 0 0 8px; font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(17,17,17,0.4);">New Project Inquiry</p>
                      <h1 style="margin: 0 0 32px; font-family: Georgia, serif; font-size: 28px; font-weight: 400; color: #111111;">${name} wants to book a ${service} shoot.</h1>

                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        ${[
                          ["Service", service],
                          ["Location", location],
                          ["Date", date || "Not specified"],
                          ["Add-ons", Array.isArray(upgrades) && upgrades.length > 0 ? upgrades.join(", ") : "None selected"],
                          ["Email", email],
                          ["Phone", phone || "Not provided"],
                          ["Details", details || "None"],
                        ].map(([label, value]) => `
                          <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid rgba(17,17,17,0.08); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(17,17,17,0.4); width: 120px;">${label}</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid rgba(17,17,17,0.08); font-size: 14px; color: #111111;">${value}</td>
                          </tr>
                        `).join("")}
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 24px 40px 40px;">
                      <a href="mailto:${email}" style="display: inline-block; padding: 14px 28px; background: #111111; color: #F8F6F2; font-family: 'Helvetica Neue', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; border-radius: 2px;">Reply to ${name.split(" ")[0]} →</a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}