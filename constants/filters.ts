import { AnimeOrderFilter, AnimeRating, AnimeType } from "../enums/enums"

export const animeTypeFilter:readonly {name:string,filter:null|AnimeType}[] = [
    {
        name : "All",
        filter : null
    },
    {
        name : "TV",
        filter : AnimeType.TV
    },
    {
        name : "Movie",
        filter : AnimeType.Movie
    },
    {
        name : "OVA",
        filter : AnimeType.OVA
    },
    {
        name : "Special",
        filter : AnimeType.Special
    },
    {
        name : "Music",
        filter : AnimeType.Music
    },
    {
        name : "Commercial",
        filter : AnimeType.CM
    },
    {
        name : "Promotional",
        filter : AnimeType.PV
    },
    {
        name : "TV special",
        filter : AnimeType.TV_special
    }
]

export const sortFilter:readonly {name:string,sortBy:AnimeOrderFilter,details:string}[] = [
    {
        name : "ID",
        sortBy : AnimeOrderFilter.Id,
        details : "Sort based on the id of the anime"
    },
    {
        name : "Title",
        sortBy : AnimeOrderFilter.Title,
        details : "Sort by the name of anime"
    },
    { 
        name : "Date Added",
        sortBy : AnimeOrderFilter.Start_date,
        details : "Sort by the start date of anime"
    },
    {
        name : "Date Ended",
        sortBy : AnimeOrderFilter.End_date,
        details : "Sort by the end date of anime"
    },
    {
        name : "Score",
        sortBy : AnimeOrderFilter.Score,
        details : "Sort by the score of anime"
    },
    {
        name : "Ranking",
        sortBy : AnimeOrderFilter.Rank,
        details : "Sort by the rank of anime"
    },
    {
        name : "Popularity",
        sortBy : AnimeOrderFilter.Popularity,
        details : "Sort by the popularity of anime"
    },
    {
        name : "Favorite",
        sortBy : AnimeOrderFilter.Favorites,
        details : "Sort by the people's favorite ranking"
    },
]

export const animeRatingFilter:readonly {name:string,filter:AnimeRating}[] = [
    {
        name : "All ages",
        filter : AnimeRating.All_ages
    },
    {
        name : "Children",
        filter : AnimeRating.Children
    },
    {
        name : "People over 13",
        filter : AnimeRating.Over_13
    },
    {
        name : "People over 17",
        filter : AnimeRating.Over_17_profanity_and_violence
    },
    {
        name : "People over 18",
        filter : AnimeRating.Mild_nudity
    },
    {
        name : "Hentai",
        filter : AnimeRating.Hentai
    },
]

export const allAnimeGenres:readonly {id:number,name:string}[] = [
    {
        id: 1,
        name: "Action",
    },
    {
        id: 2,
        name: "Adventure",
    },
    {
        id: 5,
        name: "Avant Garde",
    },
    {
        id: 46,
        name: "Award Winning",
    },
    {
        id: 28,
        name: "Boys Love",
    },
    {
        id: 4,
        name: "Comedy",
    },
    {
        id: 8,
        name: "Drama",
    },
    {
        id: 10,
        name: "Fantasy",
    },
    {
        id: 26,
        name: "Girls Love",
    },
    {
        id: 47,
        name: "Gourmet",
    },
    {
        id: 14,
        name: "Horror",
    },
    {
        id: 7,
        name: "Mystery",
        
    },
    {
        id: 22,
        name: "Romance",
    },
    {
        id: 24,
        name: "Sci-Fi",
    },
    {
        id: 36,
        name: "Slice of Life",
    },
    {
        id: 30,
        name: "Sports",
    },
    {
        id: 37,
        name: "Supernatural",
    },
    {
        id: 41,
        name: "Suspense",
    },
    {
        id: 9,
        name: "Ecchi",
    },
    {
        id: 49,
        name: "Erotica",
    },
    {
        id: 12,
        name: "Hentai",
    },
    {
        id: 50,
        name: "Adult Cast",
    },
    {
        id: 51,
        name: "Anthropomorphic",
    },
    {
        id: 52,
        name: "CGDCT",
    },
    {
        id: 53,
        name: "Childcare",
    },
    {
        id: 54,
        name: "Combat Sports",
    },
    {
        id: 81,
        name: "Crossdressing",
    },
    {
        id: 55,
        name: "Delinquents",
    },
    {
        id: 39,
        name: "Detective",
    },
    {
        id: 56,
        name: "Educational",
    },
    {
        id: 57,
        name: "Gag Humor",
    },
    {
        id: 58,
        name: "Gore",
    },
    {
        id: 35,
        name: "Harem",
        
    },
    {
        id: 59,
        name: "High Stakes Game",
    },
    {
        id: 13,
        name: "Historical",
    },
    {
        id: 60,
        name: "Idols (Female)",
    },
    {
        id: 61,
        name: "Idols (Male)",
    },
    {
        id: 62,
        name: "Isekai",
    },
    {
        id: 63,
        name: "Iyashikei",
    },
    {
        id: 64,
        name: "Love Polygon",
    },
    {
        id: 65,
        name: "Magical Sex Shift",
    },
    {
        id: 66,
        name: "Mahou Shoujo",
    },
    {
        id: 17,
        name: "Martial Arts",
    },
    {
        id: 18,
        name: "Mecha",
    },
    {
        id: 67,
        name: "Medical",
    },
    {
        id: 38,
        name: "Military",
    },
    {
        id: 19,
        name: "Music",
    },
    {
        id: 6,
        name: "Mythology",
    },
    {
        id: 68,
        name: "Organized Crime",
    },
    {
        id: 69,
        name: "Otaku Culture",
    },
    {
        id: 20,
        name: "Parody",
    },
    {
        id: 70,
        name: "Performing Arts",
    },
    {
        id: 71,
        name: "Pets",
    },
    {
        id: 40,
        name: "Psychological",
    },
    {
        id: 3,
        name: "Racing",
    },
    {
        id: 72,
        name: "Reincarnation",
    },
    {
        id: 73,
        name: "Reverse Harem"
    },
    {
        id: 74,
        name: "Romantic Subtext",
    },
    {
        id: 21,
        name: "Samurai",
    },
    {
        id: 23,
        name: "School",
    },
    {
        id: 75,
        name: "Showbiz",
    },
    {
        id: 29,
        name: "Space",
    },
    {
        id: 11,
        name: "Strategy Game",
        
    },
    {
        id: 31,
        name: "Super Power",
    },
    {
        id: 76,
        name: "Survival",
    },
    {
        id: 77,
        name: "Team Sports",
    },
    {
        id: 78,
        name: "Time Travel",
    },
    {
        id: 32,
        name: "Vampire",
    },
    {
        id: 79,
        name: "Video Game",
    },
    {
        id: 80,
        name: "Visual Arts",
    },
    {
        id: 48,
        name: "Workplace",
    },
    {
        id: 43,
        name: "Josei",
    },
    {
        id: 15,
        name: "Kids",
    },
    {
        id: 42,
        name: "Seinen",
    },
    {
        id: 25,
        name: "Shoujo",
    },
    {
        id: 27,
        name: "Shounen",
    }
]