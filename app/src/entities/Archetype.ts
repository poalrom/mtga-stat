import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';
import { logger, connection } from '../config';

@Entity()
export class Archetype {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @PrimaryColumn()
    slug: string;

    @Column('float')
    meta_part: number;

    async upsert() {
        const item = await connection().findOne(Archetype, { slug: this.slug });

        if (item) {
            logger.debug(`[Archetype] Update`, item, this);
            await connection().update(
                Archetype,
                { slug: this.slug },
                {
                    title: this.title,
                    meta_part: this.meta_part
                }
            );
            logger.debug(`[Archetype] Success update`, item, this);
        } else {
            await this.save();
        }
    }

    async save() {
        logger.debug(`[Archetype] Save`, this);
        try {
            const data = await connection().save(this);

            logger.debug(`[Archetype] Success save`, this);

            return data;
        } catch (e) {
            logger.error(e);

            return undefined;
        }
    }
}