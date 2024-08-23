import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AnimeDetails {
    id: number,
    name : string,
    image_url : string,
    type : string
}

interface WatchListState {
    watchList: AnimeDetails[];
    addToWatchList: (data:AnimeDetails) => void;
    removeFromWatchList: (data:AnimeDetails) => void;
    isAnimeInWatchList: (data: AnimeDetails) => boolean;
}

const watchListStore = create<WatchListState>()(
    persist(
        (set,get) => ({
            watchList:[],
            addToWatchList:(data: AnimeDetails) => set((state) => ({
                watchList: [...state.watchList, data]
            })),
            removeFromWatchList: (data: AnimeDetails) => set((state) => ({
                watchList: state.watchList.filter((item) => {
                    return item.id!==data.id&&item.name!==data.name
                })
            })),
            isAnimeInWatchList: (data: AnimeDetails) => {
                const state = get(); 
                return state.watchList.some((item) =>
                    item.id === data.id && item.image_url===data.image_url && item.name === data.name && item.type === data.type
                );
            },
        }),
        {
            name: 'watch-list-store',
            storage:  createJSONStorage(() => AsyncStorage), 
        } 
    )
)

export default watchListStore;