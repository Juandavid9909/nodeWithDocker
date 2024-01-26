import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource(),
    new MongoLogDatasource(),
);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log("Server started...");

        // new SendEmailLogs(
        //     emailService,
        //     logRepository
        // ).execute(
        //     ["juandavid@mail.com", "juandavid2@mail.com"]
        // );

        // emailService.sendEmailFileWithFileSystemLogs(
        //     ["juandavid@mail.com", "juandavid2@mail.com"]
        // );

        CronService.createJob(
            "*/5 * * * * *",
            () => {
                const url = "https://google.com";

                new CheckService(
                    logRepository,
                    () => console.log(`${ url } is ok`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
    }
}