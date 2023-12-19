import path from "path";
import fs from 'fs';
import { FileSystemDataSource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



describe('FileSystemDatasource', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('Should create log files if they do not exists', () => {

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);

        expect(files).toHaveLength(3);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
    });

    test('Should save log in logs-all.log', async () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        await logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));

    });
    test('Should save log in logs-medium.log', async () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        await logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('Should save log in logs-high.log', async () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        await logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('Should get logs by severity level', async () => {

        const logDatasource = new FileSystemDataSource();

        const log1 = new LogEntity({
            message: 'test1',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });
        await logDatasource.saveLog(log1);

        const log2 = new LogEntity({
            message: 'test2',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });
        await logDatasource.saveLog(log2);

        const log3 = new LogEntity({
            message: 'test3',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });
        await logDatasource.saveLog(log3);


        const lowLogs = await logDatasource.getLogs(LogSeverityLevel.low);
        const mediumLogs = await logDatasource.getLogs(LogSeverityLevel.medium);
        const highLogs = await logDatasource.getLogs(LogSeverityLevel.high);

        //is two because when file was create, was create with space blank

        expect(lowLogs).toEqual(expect.arrayContaining([log1, log2, log3]));
        expect(mediumLogs).toContainEqual(expect.objectContaining(log2));
        expect(highLogs).toContainEqual(expect.objectContaining(log3));
    });

    test('should throw an error if severity level is incorrect', async () => {
        const logDatasource = new FileSystemDataSource();
        const badSeverity = 'MEGA-HIGH' as LogSeverityLevel;

        try {
            await logDatasource.getLogs(badSeverity);
            expect(true).toBeFalsy();
        } catch (error) {
            expect(`${error}`).toContain(`Severity level ${badSeverity} not implemented`);
        }
    });


});