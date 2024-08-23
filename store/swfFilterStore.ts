import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SWFFilterState {
    isSWFEnabled: boolean;
    enableSWF: () => void;
    disableSWF: () => void;
}

const swfFilterStore = create<SWFFilterState>()(
    persist(
        (set) => ({
            isSWFEnabled: true,
            enableSWF: () => set({ isSWFEnabled: true }),
            disableSWF: () => set({ isSWFEnabled: false })
        }),
        {
            name: 'swf-filter-store',
            storage:  createJSONStorage(() => AsyncStorage), 
        } 
    )
)

export default swfFilterStore;