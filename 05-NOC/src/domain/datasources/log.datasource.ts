import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {

    public abstract saveLog(log: LogEntity): Promise<void>;

    public abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}