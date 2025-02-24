import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongodb";

export class MongoLogDatasource implements LogDatasource {

    public async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);

        console.log("Mongo Log created:", newLog.id);
    }

    public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });

        return logs.map(LogEntity.fromObject);
    }
}