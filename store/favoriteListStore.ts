import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AnimeDetails {
    id: number,
    name : string,
    image_url : string,
    type : string
}

interface favoriteListState {
    favoriteList: AnimeDetails[];
    addToFavoriteList: (data:AnimeDetails) => void;
    removeFromFavoriteList: (data:AnimeDetails) => void;
    isAnimeInFavoriteList: (data: AnimeDetails) => boolean;
}

const favoriteListStore = create<favoriteListState>()(
    persist(
        (set,get) => ({
            favoriteList:[],
            addToFavoriteList:(data: AnimeDetails) => set((state) => ({
                favoriteList: [...state.favoriteList, data]
            })),
            removeFromFavoriteList: (data: AnimeDetails) => set((state) => ({
                favoriteList: state.favoriteList.filter((item) => {
                    return item.id!==data.id&&item.name!==data.name
                })
            })),
            isAnimeInFavoriteList: (data: AnimeDetails) => {
                const state = get(); 
                return state.favoriteList.some((item) =>
                    item.id === data.id && item.image_url===data.image_url && item.name === data.name && item.type === data.type
                );
            },
        }),
        {
            name: 'favorite-list-store',
            storage:  createJSONStorage(() => AsyncStorage), 
        } 
    )
)

export default favoriteListStore;