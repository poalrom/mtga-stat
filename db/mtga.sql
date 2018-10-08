CREATE TABLE public.archetype (
    archetype_id serial PRIMARY KEY,
    title varchar(200),
    link varchar(300) UNIQUE
);

CREATE TABLE public.deck (
    deck_id serial PRIMARY KEY,
    archetype_id integer REFERENCES public.archetype,
    title varchar(200),
    link varchar(300) UNIQUE
);

CREATE TABLE public.card (
    card_id serial PRIMARY KEY,
    title varchar(200)
);

CREATE TABLE public.card_to_deck (
    card_id integer UNIQUE REFERENCES public.card,
    deck_id integer UNIQUE REFERENCES public.deck,
    quantity integer
);