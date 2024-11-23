import { CheckService } from "./check-service";
import { LogEntity } from "../../entities/log.entity";

describe("check-service.ts", () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should call successCallback when fetch returns true", async() => {
        const wasOk = await checkService.execute("https://www.google.com");

        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });

    test("should call errorCallback when fetch returns false", async() => {
        const wasOk = await checkService.execute("https://www.sdhshehgoogle.com");

        expect(wasOk).toBeFalsy();
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });
});