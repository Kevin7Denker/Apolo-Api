import { Resend } from "resend";
import * as dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND);

export default resend;
