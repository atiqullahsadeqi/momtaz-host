import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import InquiryEmail from "@/emails/inquiry";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const { name, email, phone, company, product, details } = await req.json();
    if (!name || !email || !product) {
        return NextResponse.json({ error: "Name, email, and product are required" }, { status: 400 });
    }

    const html = await render(InquiryEmail({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerCompany: company,
        product,
        details,
    }));

    await resend.emails.send({
        from: "Momtaz Host <no-reply@mail.momtaz.ws>",
        to: "support@momtaz.ws",
        cc: "atiqullah@momtaz.ws",
        replyTo: email,
        subject: `New Inquiry — ${product}`,
        html,
    });

    return NextResponse.json({ success: true });
}
