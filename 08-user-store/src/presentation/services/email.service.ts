import nodemailer, { Transporter } from "nodemailer";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {

  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    senderEmailPassword: string
  ) {
    this.transporter = nodemailer.createTransport( {
        service: mailerService,
        auth: {
            user: mailerEmail,
            pass: senderEmailPassword,
        }
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch ( error ) {
      return false;
    }
  }


  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
        <h3>Logs de sistema - NOC</h3>

        <p>Lorem velit non veniam ullamco ex eu laborum deserunt est amet elit nostrud sit. Dolore ullamco duis in ut deserunt. Ad pariatur labore exercitation adipisicing excepteur elit anim eu consectetur excepteur est dolor qui. Voluptate consectetur proident ex fugiat reprehenderit exercitation laboris amet Lorem ullamco sit. Id aute ad do laborum officia labore proident laborum. Amet sit aliqua esse anim fugiat ut eu excepteur veniam incididunt occaecat sit irure aliquip. Laborum esse cupidatat adipisicing non et cupidatat ut esse voluptate aute aliqua pariatur.</p>

        <p>Ver logs adjuntos</p>
    `;

    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to, subject, attachments, htmlBody
    });
  }
}