var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import resend from "../Config/Email";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
export function SignUpEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const templatePath = path.join(__dirname, "../../../Templates/Emails/Email_Validation.html");
        const templateContent = fs.readFileSync(templatePath, "utf-8");
        const html = yield ejs.render(templateContent, {
            verificationLink: `https://apolo-api.onrender.com/auth/verify-email/${token}`,
        });
        resend.emails.send({
            from: `${process.env.RESEND_EMAIL}`,
            to: `${email}`,
            subject: "Please verify your email address",
            html: html,
        });
    });
}
//# sourceMappingURL=Auth_Emails.js.map