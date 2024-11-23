export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, origin, createdAt= new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    public static fromJson(json: string): LogEntity {
        json = json === "" ? "{}" : json;
        const { message, level, createdAt, origin } = JSON.parse(json);
        const log: LogEntity = new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        });

        return log;
    }

    public static fromObject(object: { [key: string]: any }): LogEntity {
        const { message, level, createdAt, origin } = object;
        const log: LogEntity = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });

        return log;
    }
}