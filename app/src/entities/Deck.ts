import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';
import { logger, connection } from '../config';

@Entity()
export class Deck {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    archetype_id: number;

    @Column()
    title: string;

    @PrimaryColumn()
    slug: string;

    async upsert() {
        const item = await connection().findOne(Deck, { slug: this.slug });

        if (item) {
            await this.update();
        } else {
            await this.save();
        }
    }

    async update() {
        logger.debug(`[Deck] Update`, this);
        try {
            const data = await connection().update(
                Deck,
                { slug: this.slug },
                {
                    title: this.title,
                    archetype_id: this.archetype_id
                }
            );

            logger.debug(`[Deck] Success update`, this);

            return data;
        } catch (e) {
            logger.error('[Deck] Update error');
            logger.error(e);

            return undefined;
        }
    }

    async save() {
        logger.debug(`[Deck] Save`, this);
        try {
            const data = await connection().save(this);

            logger.debug(`[Deck] Success save`, this);

            return data;
        } catch (e) {
            logger.error('[Deck] Save error');
            logger.error(e);

            return undefined;
        }
    }
}