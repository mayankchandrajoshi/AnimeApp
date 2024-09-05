export type RootStackParamList = {
    Tab: undefined;
    AnimeDetails: { id: number };
    EpisodesDetails: { animeId: number,episodeId: number };
    CharacterDetails: { id: number };
    VoiceActorDetails: { id: number };
    Search: { query : string|null };
    SWFModal: undefined;
    GenreAnime: { id:number, name:string };
};

export type TabsStackParamList = {
    Home : undefined,
    MyList : undefined,
    Browse : undefined,
    Schedule : undefined,
    User : undefined
};