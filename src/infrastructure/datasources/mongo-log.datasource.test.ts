import mongoose from "mongoose";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { envs } from '../../config/plugins/envs.plugin';


describe(' MongoLogDatasource', () => {

    const logDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Testst',
        origin: 'mongo-log.datasource.test.ts'
    });

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME!,
            mongoUrl: envs.MONGO_URL!,
        });
    });

    afterEach(async () => {
        await LogModel.deleteMany();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('Should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');
        await logDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Mongo log Created', expect.any(String));

    });

    test('Should get logs', async () => {

        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toEqual(expect.objectContaining({
            level: LogSeverityLevel.high,
            message: 'Testst',
        }));

    });
});