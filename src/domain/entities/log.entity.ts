export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
};

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    level: LogSeverityLevel;
    message: string;
    createdAt: Date;
    origin: string;

    constructor(options: LogEntityOptions) {
        this.message = options.message;
        this.level = options.level;
        this.origin = options.origin;
        this.createdAt = options.createdAt ? options.createdAt : new Date();
    }

    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        });

        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });

        return log;
    }
}