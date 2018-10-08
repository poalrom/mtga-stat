import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, getConnection } from 'typeorm';
import { logger } from '../config';

@Entity()
export class Archetype {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @PrimaryColumn()
    slug: string;

    async upsert() {
        const connection = getConnection().manager;
        const item = await connection.findOne(Archetype, { slug: this.slug });

        if (item) {
            logger.debug(`[Archetype] Update`, item, this);
            await connection.update(Archetype, { slug: this.slug }, { title: this.title });
            logger.debug(`[Archetype] Success update`, item, this);
        } else {
            await this.save();
        }
    }

    async save() {
        logger.debug(`[Archetype] Save`, this);
        try {
            const data = await getConnection().manager.save(this);

            logger.debug(`[Archetype] Success save`, this);

            return data;
        } catch (e) {
            logger.error(e);

            return undefined;
        }
    }
}