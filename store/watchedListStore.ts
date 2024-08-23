import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AnimeDetails {
    id: number,
    name : string,
    image_url : string,
    type : string
}

interface WatchedListState {
    watchedList: AnimeDetails[];
    addToWatchedList: (data:AnimeDetails) => void;
    removeFromWatchedList: (data:AnimeDetails) => void;
    isAnimeInWatchedList: (data: AnimeDetails) => boolean;
}

const watchedListStore = create<WatchedListState>()(
    persist(
        (set,get) => ({
            watchedList:[],
            addToWatchedList:(data: AnimeDetails) => set((state) => ({
                watchedList: [...state.watchedList, data]
            })),
            removeFromWatchedList: (data: AnimeDetails) => set((state) => ({
                watchedList: state.watchedList.filter((item) =>{
                    return item.id!==data.id && item.name!==data.name
                })
            })),
            isAnimeInWatchedList: (data: AnimeDetails) => {
                const state = get(); 
                return state.watchedList.some((item) =>
                    item.id === data.id && item.image_url===data.image_url && item.name === data.name && item.type === data.type
                );
            },
        }),
        {
            name: 'watched-list-store',
            storage:  createJSONStorage(() => AsyncStorage), 
        } 
    )
)

export default watchedListStore;