import resend from "../Config/Email";
import ejs from "ejs";
import fs from "fs";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

export async function SignUpEmail(email: string, token: string) {
  const templatePath = path.join(
    __dirname,
    "../../../Templates/Emails/Email_Validation.html"
  );
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  const html = await ejs.render(templateContent, {
    verificationLink: `https://api-apolo.kvdenker.com/auth/verify-email/${token}`,
  });

  resend.emails.send({
    from: `${process.env.RESEND_EMAIL}`,
    to: `${email}`,
    subject: "Please verify your email address",
    html: html,
  });
}
