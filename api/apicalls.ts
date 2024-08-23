import { AnimeOrderFilter, AnimeRating, AnimeSeason, AnimeSortFilter, AnimeType, Days } from "../enums/enums";

export const allGenre = `https://api.jikan.moe/v4/genres/anime`;

export const searchAnime = (query: string|null ,type: AnimeType|null ,min_score :number= 0,rating: AnimeRating|null, genres :number[],orderBy:AnimeOrderFilter|null ,sortOrder:"desc"|"asc" = "desc", swf: true|false = true, page: number = 1 ) => {

    let queryStr = "https://api.jikan.moe/v4/anime?";

    if(query){
        queryStr+=`q=${query}`
    }

    if(type){
        queryStr+=`&type=${type}`
    }

    if(min_score){
        queryStr+=`&min_score=${min_score}`
    }

    if(rating){
        queryStr+=`&rating=${rating}`
    }

    if(swf){
        queryStr+=`&swf=${swf}`
    }

    if(genres.length>0){
        let genresStr = genres.join(',');
        queryStr+=`&genres=${genresStr}`;
    }

    if(orderBy){
        queryStr+=`&order_by=${orderBy}`
    }

    if(sortOrder){
        queryStr+=`&sort=${sortOrder}`
    }

    if(page){
        queryStr+=`&page=${page}`
    }
    
    return queryStr;
}

export const seasonList = `https://api.jikan.moe/v4/seasons`;

export const seasonalAnime = (year:number,season:AnimeSeason,swf: true|false = true, page = 1,limit = 10 ) =>{
    return `https://api.jikan.moe/v4/seasons/${year}/${season}?swf=${swf}&page=${page}&limit=${limit}`;
}

export const topAnime = (type: AnimeType|null,filter:AnimeSortFilter|null,rating:AnimeRating|null,swf: true|false = true, page: number = 1, limit: number =10 ) => {
    return `https://api.jikan.moe/v4/top/anime?${type?"type="+type:""}${filter?"&filter="+filter:""}${rating?"&rating="+rating:""}&swf=${swf}&page=${page}&limit=${limit}`;
}

export const animeDetails = (id: number) => {
    return `https://api.jikan.moe/v4/anime/${id}/full`
}

export const animeEpisodes = (id: number , page: number = 1) => {
    return `https://api.jikan.moe/v4/anime/${id}/episodes&page=${page}`
}

export const animeSingleEpisode = (id: number ,episode: number) => {
    return `https://api.jikan.moe/v4/anime/${id}/episodes/${episode}`
}

export const animeCharacter = (id: number) => {
    return `https://api.jikan.moe/v4/anime/${id}/characters`
}

export const characterDetails = (id: number) => {
    return `https://api.jikan.moe/v4/characters/${id}`
}

export const characterImages = (id: number) => {
    return  `https://api.jikan.moe/v4/characters/${id}/pictures`
}

export const characterVoiceActor = (id:number) =>{
    return `https://api.jikan.moe/v4/characters/${id}/voices`
}

export const personDetails = (id:number) => {
    return `https://api.jikan.moe/v4/people/${id}`
}

export const personPicture = (id:number) => {
    return `https://api.jikan.moe/v4/people/${id}/pictures`
}

export const personAnime = (id:number) => {
    return `https://api.jikan.moe/v4/people/${id}/anime`
}

export const animeRecommendation = (id: number) => {
    return `https://api.jikan.moe/v4/anime/${id}/recommendations`
}

export const scheduledAnime = (day: Days,swf:true|false = true,page:number = 1,limit:number = 10) =>{
    return `https://api.jikan.moe/v4/schedules?filter=${day}&swf=${swf}&page=${page}&limit=${limit}`
}