import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";



describe('Check service UseCase', () => {

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockMongoRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockPostgresRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple([mockLogRepository, mockMongoRepository, mockPostgresRepository], successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call succesCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://www.google.com');
        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });

    test('should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://www.5fddsfdsfddsfds453.com');
        expect(wasOk).toBeFalsy();
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });
});