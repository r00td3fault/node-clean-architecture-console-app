import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";



describe('LogDataSource', () => {

    const newLog = new LogEntity({
        message: 'Test logdataosurce',
        level: LogSeverityLevel.medium,
        origin: 'log.datasource.test.ts'
    });

    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {

        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }
    test('should test the abstract class', async () => {

        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.getLogs).toBe('function');
        expect(typeof mockLogDatasource.saveLog).toBe('function');

        await mockLogDatasource.saveLog(newLog);
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.medium);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

    });
});