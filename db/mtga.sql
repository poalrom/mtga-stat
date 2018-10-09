CREATE TABLE public.archetype (
    id serial PRIMARY KEY,
    title varchar(200) NOT NULL,
    slug varchar(300) UNIQUE NOT NULL,
    meta_part float
);

CREATE TABLE public.deck (
    id serial PRIMARY KEY,
    archetype_id integer REFERENCES public.archetype(id),
    title varchar(200) NOT NULL,
    slug varchar(300) UNIQUE NOT NULL
);

CREATE TYPE card_rarity AS ENUM ('common', 'uncommon', 'rare', 'mythic');

CREATE TABLE public.card (
    id serial PRIMARY KEY,
    title varchar(200) NOT NULL,
    rarity card_rarity,
    picture_url varchar(200)
);

CREATE TABLE public.card_to_deck (
    card_id integer UNIQUE REFERENCES public.card(id),
    deck_id integer UNIQUE REFERENCES public.deck(id),
    quantity integer
);