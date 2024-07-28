import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import hbs from "nodemailer-express-handlebars";

import { Configs } from "../configs/configs";
import { emailConstants } from "../constants/email.constants";
import { EmailEnum } from "../enums/email.enum";
import { EmailPickPayloadType } from "../types/email-pick.payload-type";

class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      from: Configs.SMTP_EMAIL,
      auth: {
        user: Configs.SMTP_EMAIL,
        pass: Configs.SMTP_PASSWORD,
      },
    });
    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
          layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        },
        viewPath: path.join(process.cwd(), "src", "templates", "views"),
        extName: ".hbs",
      }),
    );
  }
  public async sendEmail<T extends EmailEnum>(
    type: T,
    to: string,
    context: EmailPickPayloadType[T],
  ) {
    const { subject, template } =
      emailConstants[type as keyof typeof emailConstants];
    const options = {
      to,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(options);
  }
}
export const mailService = new MailService();
