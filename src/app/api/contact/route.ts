import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";


const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
  
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL ?? "TODO-your@email.com"],
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html: `
        <div style="font-family: monospace; background: #07070D; color: #F5F0E8; padding: 32px; border-radius: 12px;">
          <h2 style="color: #F5A623; margin-bottom: 16px;">New message from ${data.name}</h2>
          <p><strong style="color: #F5A623;">From:</strong> ${data.name} &lt;${data.email}&gt;</p>
          <p><strong style="color: #F5A623;">Subject:</strong> ${data.subject}</p>
          <hr style="border-color: rgba(168, 200, 255,0.2); margin: 24px 0;" />
          <div style="white-space: pre-wrap;">${data.message}</div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: (error as any).errors }, { status: 400 });
    }
    console.error("Contact email error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
