import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class Server {

    public static start() {
        console.log("Server started...");

        const emailService = new EmailService();

        emailService.sendEmail({
            to: "jvarela@xrm.com.co",
            subject: "Logs de sistema",
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
                <p>Ver logs adjuntos</p>
            `
        });

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