import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("send-email-logs.ts", () => {
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true)
    };

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as unknown as EmailService,
        mockLogRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should call sendEmail and saveLog", async() => {
        const result = await sendEmailLogs.execute("juandavid@mail.com");

        expect(result).toBeTruthy();
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts"
        });
    });

    test("should log in case of error", async() => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute("juandavid@mail.com");

        expect(result).toBeFalsy();
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-email-logs.ts"
        });
    });
});