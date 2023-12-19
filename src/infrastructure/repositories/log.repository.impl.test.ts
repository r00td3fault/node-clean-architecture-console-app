import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('LogRepositoryImpl', () => {

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const logRepository = new LogRepositoryImpl(mockLogDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveLog -> should call the datasource with arguments', () => {

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logRepository.saveLog(log);

        expect(mockLogDataSource.saveLog).toHaveBeenCalled();
        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });

    test('getLogs -> should call the datasource with arguments', () => {

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logRepository.saveLog(log);
        logRepository.getLogs(LogSeverityLevel.medium);

        expect(mockLogDataSource.getLogs).toHaveBeenCalled();
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.medium);
    });
});