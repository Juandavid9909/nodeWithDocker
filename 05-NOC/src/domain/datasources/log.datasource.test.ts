import { LogDatasource } from "./log.datasource";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

describe("log.datasource.test.ts", () => {
    const newLog = new LogEntity({
        origin: "log.datasource.test.ts",
        message: "test-message",
        level: LogSeverityLevel.low
    });

    class MockLogDatasource implements LogDatasource {

        public async saveLog(log: LogEntity): Promise<void> {
            return;
        }

        public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test("should test the abstract class", async() => {
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.saveLog).toBe("function");
        expect(typeof mockLogDatasource.getLogs).toBe("function");

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });
});