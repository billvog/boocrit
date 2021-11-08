import { __prod__ } from "../contants";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import hbs from "nodemailer-express-handlebars";

type TransporterType = Transporter<SMTPTransport.SentMessageInfo>;
export type MySendMailOptions = SendMailOptions & {
  template?: string;
  context?: {
    [key: string]: string;
  };
};

export class MyMailer {
  #transporter: TransporterType;

  constructor(tansporter: TransporterType) {
    this.#transporter = tansporter;
  }

  async SendMail(options: MySendMailOptions) {
    const info = await this.#transporter.sendMail({
      ...options,
      from: '"Boocrit" <hello@boocrit.tk>',
    });

    console.log("Message sent: %s", info.messageId);
    if (!__prod__) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  }
}

export const ConfigureMailer = (): MyMailer => {
  let transporter: TransporterType;
  if (__prod__) {
    transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_APIKEY,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "e3azlrucypnhw275@ethereal.email",
        pass: "zb8nWDxSFSvb8UgzkU",
      },
    });
  }

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        layoutsDir: "./src/email-template",
        defaultLayout: undefined,
      },
      viewPath: "./src/email-template",
    })
  );

  return new MyMailer(transporter);
};
