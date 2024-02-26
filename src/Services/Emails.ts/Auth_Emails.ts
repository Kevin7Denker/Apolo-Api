import resend from "../Config/Email";
import ejs from "ejs";
import fs from "fs";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config;

export async function SignUpEmail(email: string, token: string) {
  const templatePath = path.join(
    __dirname,
    "../../Templates/Emails/Email_Validation.html"
  );
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  const html = await ejs.render(templateContent, {
    verificationLink: `https://apolo-api.onrender.com/auth/verify-email=${token}`,
  });

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "oficialdenker@gmail.com",
    subject: "Please verify your email address",
    html: html,
  });
}
