import nodemailer from "nodemailer";

import { envs } from "../../config/plugins/envs.plugin";

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

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}

    public async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    public async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = "Logs del servidor";
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>

            <p>Et deserunt pariatur irure dolor reprehenderit sunt voluptate incididunt dolore velit ea et id adipisicing. Non consequat voluptate ea exercitation eiusmod cillum laboris ut. Lorem ex ad dolore veniam.</p>

            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            { filename: "logs-all.log", path: "./logs/logs-all.log" },
            { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
            { filename: "logs-high.log", path: "./logs/logs-high.log" }
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        });
    }
}