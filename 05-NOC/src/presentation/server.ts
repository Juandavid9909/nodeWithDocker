import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { FileSystemDatasource, MongoLogDatasource, PostgresLogDatasource } from "../infrastructure/datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/logs.repository.impl";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
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

                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${ url } is ok`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
    }
}