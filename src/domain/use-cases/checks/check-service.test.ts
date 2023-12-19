import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";



describe('Check service UseCase', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call succesCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://www.google.com');
        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });

    test('should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://www.5fddsfdsfddsfds453.com');
        expect(wasOk).toBeFalsy();
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });
});