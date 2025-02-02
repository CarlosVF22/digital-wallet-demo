import { Resend } from "resend";

const resend = new Resend(
    process.env.RESEND_API_KEY || "re_jKNjdKXr_C3GrBqvYxRLnw5UTaAGRAre9"
);

export async function sendEmail(to: string, subject: string, html: string) {
    try {
        resend.emails.send({
            from: "hola@carlosvasquez.dev",
            to: to,
            subject: subject,
            html: html,
        });
    } catch (error) {
        console.error(error);
    }
}
