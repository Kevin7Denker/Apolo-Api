import resend from "../Config/Email";
import ejs from "ejs";
import fs from "fs";
import path from "path";

import AuthMiddleWare from "src/MiddleWare/Auth_MiddleWare";

import * as dotenv from "dotenv";
dotenv.config();

export async function SignUpEmail(email: string, token: string) {
  const templatePath = path.join(
    __dirname,
    "../../../Templates/Emails/Email_Validation.html"
  );
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  const tokenChecked = AuthMiddleWare.simpleCheckToken(token);

  if (!tokenChecked) {
    throw new Error("Invalid Token");
  }

  const html = await ejs.render(templateContent, {
    verificationLink: `https://api-apolo.kvdenker.com/auth/verify-email/${tokenChecked}`,
  });

  resend.emails.send({
    from: `${process.env.RESEND_EMAIL}`,
    to: `${email}`,
    subject: "Please verify your email address",
    html: html,
  });
}

export async function errorEmail(token: string) {
  const templatePath = path.join(
    __dirname,
    "../Templates/Responses/Response_NotVerified.html"
  );
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  const html = await ejs.render(templateContent, {
    verificationLink: `https://api-apolo.kvdenker.com/auth/verify-email/resend/${token}`,
  });

  return html;
}

export async function sendChangePasswordEmail(email: string, token: string) {
  const tokenChecked = AuthMiddleWare.simpleCheckToken(token);

  if (!tokenChecked) {
    throw new Error("Invalid Token");
  }

  const templatePath = path.join(
    __dirname,
    "../../../Templates/Emails/Response_Change_Password.html"
  );

  const templateContent = fs.readFileSync(templatePath, "utf-8");

  const html = await ejs.render(templateContent, {
    verificationLink: `https://api-apolo.kvdenker.com/auth/change-password/${tokenChecked}`,
  });

  resend.emails.send({
    from: `${process.env.RESEND_EMAIL}`,
    to: `${email}`,
    subject: "Change your password",
    html: html,
  });
}
