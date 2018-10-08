import { load } from 'cheerio';
import { BASE_URL, logger } from '../config';
import { Archetype } from '../entities/Archetype';
import Request from '../helpers/request';


export default async function parse() {
    const $mainPage = load(await Request.get(`${BASE_URL}/Standard`));
    const archetypes = [];

    $mainPage(`#archetypesTable tbody tr td a`).each((index, link) => {
        const linkTag = $mainPage(link);
        const archetype = new Archetype();
        archetype.title = linkTag.text();
        archetype.slug = linkTag.attr('href').substr(1);
        archetypes.push(archetype.upsert());
    });

    Promise.all(archetypes);

}