import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new MongoLogDatasource(),
    // new PostgresLogDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log("Server started...");

        // new SendEmailLogs(
        //     emailService,
        //     logRepository
        // ).execute(
        //     ["juandavid@mail.com", "juandavid2@mail.com"]
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        // emailService.sendEmailFileWithFileSystemLogs(
        //     ["juandavid@mail.com", "juandavid2@mail.com"]
        // );

        CronService.createJob(
            "*/5 * * * * *",
            () => {
                const url = "https://google.com";

                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${ url } is ok`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
    }
}