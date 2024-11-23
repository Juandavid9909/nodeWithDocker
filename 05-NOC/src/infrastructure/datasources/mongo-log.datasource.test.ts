import mongoose from "mongoose";

import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongodb";
import { MongoDatabase } from "../../data/mongodb/init";
import { MongoLogDatasource } from './mongo-log.datasource';

describe("mongo-log.datasource.ts", () => {
    const logDatasource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: "test-message",
        origin: "mongo-log.datasource.test.ts"
    });

    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    afterEach(() => {
        LogModel.deleteMany();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("should create a log", async() => {
        const logSpy = jest.spyOn(console, "log");

        await logDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalledWith();
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));
    });

    test("should get logs", async() => {
        await logDatasource.saveLog(log);
        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});