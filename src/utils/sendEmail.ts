import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { env } from "@/env";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  templateData: object
) => {
  try {

    const templatePath = path.join(process.cwd(), "src/emails", `${templateName}.ejs`);


    const html = await ejs.renderFile(templatePath, templateData);

    const info = await transporter.sendMail({
      from: `"GearVault Admin" <${env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✉️ Mail sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Mail Error:", error);
    return { success: false, error };
  }
};