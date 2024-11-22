import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/logs.repository.impl";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

const logRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const emailService = new EmailService();

export class Server {

    public static start() {
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(["juandavid@mail.com"]);

        CronService.createJob(
            "*/5 * * * * *",
            () => {
                const url = "https://www.google.com";

                new CheckService(
                    logRepository,
                    () => console.log(`${ url } is ok`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
    }
}