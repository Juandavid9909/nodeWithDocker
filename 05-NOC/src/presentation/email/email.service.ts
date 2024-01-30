import nodemailer from 'nodemailer';

import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
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

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
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

    async sendEmailFileWithFileSystemLogs(to: string | string[]) {
        const subject = "Logs del servidor";
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            {
                filename: "logs-all.log",
                path: "./logs/logs-all.log"
            },
            {
                filename: "logs-high.log",
                path: "./logs/logs-high.log"
            },
            {
                filename: "logs-medium.log",
                path: "./logs/logs-medium.log"
            }
        ];

        return this.sendEmail({
            to,
            subject,
            attachments,
            htmlBody
        });
    }
}