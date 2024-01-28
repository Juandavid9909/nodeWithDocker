import { CheckService } from "./check-service";
import { LogEntity } from "../../entities/log.entity";

describe("CheckService UseCase", () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should call successCallback when fetch returns true", async() => {
        const wasOk = await checkService.execute("https://www.google.com");

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });

    test("should call error callback when fetch returns false", async() => {
        const wasOk = await checkService.execute("https://www.gowegwegweogle.com");

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });
});