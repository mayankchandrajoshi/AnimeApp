export enum Days {
    Monday = "monday" ,
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
    Sunday = "sunday",
    Unknown = "unknown",
    Other = "other"
}

export enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export enum AnimeType {
    TV = 'tv',
    Movie = 'movie',
    OVA = 'ova',
    Special = 'special',
    ONA = 'ona',
    Music = 'music',
    CM = 'cm',
    PV = 'pv',
    TV_special = 'tv_special',
}


export enum AnimeSortFilter {
    Airing = 'airing',
    Upcoming = 'upcoming',
    Popularity = 'bypopularity',
    Favorite = 'favorite',
}

export enum AnimeOrderFilter {
    Id = 'mal_id',
    Title = 'title',
    Start_date = 'start_date',
    End_date = 'end_date',
    Score = 'score',
    Rank = 'rank',
    Popularity = 'popularity',
    Favorites = 'favorites'
}

export enum AnimeRating {
    All_ages = "g",
    Children = "pg",
    Over_13 = "pg13",
    Over_17_profanity_and_violence = "r17",
    Mild_nudity = "r",
    Hentai = "rx"
}

export enum AnimeSeason {
    Winter = 'winter',
    Spring = 'spring',
    Summer = 'summer',
    Fall = 'fall'
}