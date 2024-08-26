export type RootStackParamList = {
    Tab: undefined;
    AnimeDetails: { id: number };
    EpisodesDetails: { animeId: number,episodeId: number };
    CharacterDetails: { id: number };
    VoiceActorDetails: { id: number };
    Search: { query : string|null };
    SWFModal: undefined;
};

export type BrowseStackParamList = {
    Browse: undefined;
    GenreAnime: { id:number, name:string };
};