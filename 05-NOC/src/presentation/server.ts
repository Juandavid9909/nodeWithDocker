import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/logs.repository.impl";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class Server {

    public static start() {
        CronService.createJob(
            "*/5 * * * * *",
            () => {
                const url = "https://www.google.com";

                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${ url } is ok`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
    }
}