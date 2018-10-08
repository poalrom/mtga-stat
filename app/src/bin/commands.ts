#!/usr/bin/env ts-node

import * as program from 'commander';
import { init, BASE_URL } from '../config';
import parseArchetypes from '../parsers/archetypesParser';
import parseDecks from '../parsers/decksParser';

init().then(() => {
    program
        .description('mtga-stat-cli')
        .version('0.1.0');

    program
        .command('parse-archetypes')
        .description(`Parse all arhetypes from ${BASE_URL}/Standart`)
        .alias('pa')
        .action(parseArchetypes);

    program
        .command('parse-decks')
        .description(`Parse decks for all archetypes from ${BASE_URL}/Standart`)
        .alias('pd')
        .action(parseDecks);

    program.parse(process.argv);
})