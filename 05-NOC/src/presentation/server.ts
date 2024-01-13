import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log("Server started...");

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ["juandavid@mail.com", "juandavid2@mail.com"]
        // );

        // emailService.sendEmailFileWithFileSystemLogs(
        //     ["juandavid@mail.com", "juandavid2@mail.com"]
        // );

        // CronService.createJob(
        //     "*/5 * * * * *",
        //     () => {
        //         const url = "https://google.com";

        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok`),
        //             (error) => console.log(error)
        //         ).execute(url);
        //     }
        // );
    }
}