import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerificationEmail } from "@/emails/verification";
import { ResetPasswordEmail } from "@/emails/reset-password";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true, // Force verification
        sendResetPassword: async ({ user, url, token }, request) => {
            const html = await render(React.createElement(ResetPasswordEmail, {
                name: user.name,
                url: url
            }));

            await resend.emails.send({
                from: "Momtaz Host <no-reply@mail.momtaz.ws>",
                to: user.email,
                subject: "Reset your password",
                html: html,
            });
        },
    },
    user: {
        additionalFields: {
            phoneNumber: {
                type: "string",
                required: false,
            },
            organization: {
                type: "string",
                required: false,
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "user"
            }
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const html = await render(React.createElement(VerificationEmail, {
                name: user.name,
                url: url
            }));

            await resend.emails.send({
                from: "Momtaz Host <no-reply@mail.momtaz.ws>",
                to: user.email,
                subject: "Verify your email address",
                html: html,
            });
        },
    },

    trustedOrigins: [
        "http://localhost:3000",
        "http://admin.localhost:3000",
        "https://momtaz.ws",
        "https://admin.momtaz.ws",
        "https://momtaz-host.lcl.host:44318"
    ],
});
