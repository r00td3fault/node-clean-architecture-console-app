import { LogEntity, LogSeverityLevel } from "./log.entity";



describe('LogEntity', () => {
    const dataObj = {
        message: 'Hola test',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts'
    };

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj);

        expect(log).toMatchObject(dataObj);

    });

    test('should create a LogEntity instance from Json', () => {

        const json = `{"message": "test-message","origin": "log.model.test.ts","level": "low","createdAt": "2023-12-15T20:28:22.469Z"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toMatchObject({
            message: "test-message",
            origin: "log.model.test.ts",
            level: "low",
            createdAt: new Date("2023-12-15T20:28:22.469Z"),
        });

    });

    test('should create a LogEntity instance from Object', () => {

        const log = LogEntity.fromObject(dataObj);
        expect(log).toMatchObject(dataObj);
    });


});