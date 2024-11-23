import nodemailer from "nodemailer";

import { EmailService, SendMailOptions } from "./email.service";

describe("email.service.ts", () => {
    const emailService = new EmailService();
    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    test("should send email", async() => {
        const options: SendMailOptions = {
            to: "juandavid@mail.com",
            subject: "Test",
            htmlBody: "<h1>Test</h1>"
        };

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "juandavid@mail.com"
        });
    });

    test("should send email with attachments", async() => {
        const email = "juandavid@mail.com";

        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subjec: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: "logs-all.log", path: "./logs/logs-all.log" },
                { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
                { filename: "logs-high.log", path: "./logs/logs-high.log" }
            ])
        });
    });
});