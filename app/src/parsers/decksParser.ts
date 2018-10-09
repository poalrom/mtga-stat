import { load } from 'cheerio';
import { BASE_URL, connection } from '../config';
import { Archetype } from '../entities/Archetype';
import Request from '../helpers/request';
import { Deck } from '../entities/Deck';


export default async function parse() {
    const archetypes = await connection().find(Archetype);

    Promise.all(archetypes.map(async (archetype) => {
        const $archetypePage = load(await Request.get(`${BASE_URL}/Standard/${archetype.slug}`));
        const decks = [];

        $archetypePage(`.decks table tr:not(:first-child) td:nth-child(2) a`).each((index, link) => {
            const linkTag = $archetypePage(link);
            const deck = new Deck();

            deck.title = linkTag.text();
            deck.slug = linkTag.attr('href').split('/')[1];
            decks.push(deck.upsert());
        });

        return Promise.all(decks);
    }));
}

parse();