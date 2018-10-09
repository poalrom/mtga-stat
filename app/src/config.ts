import "reflect-metadata";
import { createConnection, getConnection } from 'typeorm';
import { Archetype } from './entities/Archetype';
import * as winston from 'winston';
import { Deck } from "./entities/Deck";

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
                Archetype,
                Deck
            ]
        });
    } catch (error) {
        logger.error('[DB] Connection error');
        logger.error(error);
        process.exit(1);
    }
}

export const connection = () => getConnection().manager;