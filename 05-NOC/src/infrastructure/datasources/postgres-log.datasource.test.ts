import { PrismaClient, SeverityLevel } from "@prisma/client";

import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDatasource } from "./postgres-log.datasource";

describe("PostgresLogDatasource", () => {
    const logDatasource = new PostgresLogDatasource();

    const prismaClient = new PrismaClient();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: "test message",
        origin: "postgres-log.datasource.test.ts"
    });

    const severityEnum = {
        low: SeverityLevel.LOW,
        medium: SeverityLevel.MEDIUM,
        high: SeverityLevel.HIGH
    }

    afterEach(async() => {
        await prismaClient.logModel.deleteMany();
    });

    test("should create a log", async() => {
        const logSpy = jest.spyOn(console, "log");

        await logDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Postgres Log created:", expect.any(Number));
    });

    test("should get logs", async() => {
        await logDatasource.saveLog(log);
        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(severityEnum.medium);
    });
});