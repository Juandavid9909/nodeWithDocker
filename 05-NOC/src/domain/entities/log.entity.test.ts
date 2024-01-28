import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("LogEntity", () => {
    const dataObj = {
        message: "Hola Mundo",
        level: LogSeverityLevel.high,
        origin: "log.entity.test.ts"
    }

    test("should create a LogEntity instance", () => {
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test("should create a LogEntity instance from json", () => {
        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-01-28T16:04:25.481Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test("should create a LogEntity instance from object", () => {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});