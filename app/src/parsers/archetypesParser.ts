import { load } from 'cheerio';
import { BASE_URL } from '../config';
import { Archetype } from '../entities/Archetype';
import Request from '../helpers/request';


export default async function parse() {
    const $mainPage = load(await Request.get(`${BASE_URL}/Standard`));
    const archetypes = [];

    $mainPage(`#archetypesTable tbody tr`).each((index, row) => {
        const linkTag = $mainPage(row).find('td:nth-child(2) a');
        const metaPartTag = $mainPage(row).find('td:nth-child(3) b');
        const archetype = new Archetype();

        console.log(metaPartTag.text().replace(/[^0-9\.]/g, ''));

        archetype.title = linkTag.text();
        archetype.slug = linkTag.attr('href').substr(1).split('/')[1];
        archetype.meta_part = Number(metaPartTag.text().replace(/[^0-9\.]/g, ''));
        archetypes.push(archetype.upsert());
    });

    Promise.all(archetypes);

}