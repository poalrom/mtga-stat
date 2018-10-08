import "reflect-metadata";
import { createConnection } from 'typeorm';
import { Archetype } from './entities/Archetype';
import * as winston from 'winston';

export const BASE_URL = 'https://mtgdecks.net';
export const logger = winston.createLogger({
    format: winston.format.simple({
        handleExceptions: true
    }),
    exitOnError: true
});

logger.add(new winston.transports.Console({
    level: 'debug'
}))

export async function init() {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 8081,
            username: "postgres",
            password: "mtga",
            database: "mtga",
            entities: [
                Archetype
            ]
        });
    } catch (error) {
        throw error;
        process.exit(1);
    }
}