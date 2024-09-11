import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userInterface } from '../interface/commonInterface';

const CLEAR_USER_TIME = 7 * 24 * 60 * 60 * 1000;

interface userDataState {
    userData: {
        isAuthenticated : boolean,
        user : userInterface|null
    };
    login : (data:userInterface) => void;
    update : (data: userInterface) => void;
    logout : () => void;
    _timestamp ?: number;
}

const userStore = create<userDataState>()(
    persist(
        (set,get) => ({
            userData:{
                isAuthenticated:false,
                user:null
            },
            login:(data: userInterface) => set((state) => ({
                userData : {
                    isAuthenticated : true,
                    user : data
                },
                _timestamp: Date.now()
            })),
            update:(data: userInterface) => set((state) => ({
                userData : {
                    isAuthenticated : true,
                    user : data
                }
            })),
            logout:() => set((state) => ({
                userData : {
                    isAuthenticated : false,
                    user : null
                }
            })),
        }),
        {
            name: 'userData-store',
            storage: createJSONStorage(() => AsyncStorage),
            // Custom logic to clear AsyncStorage after 7 days
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const now = Date.now();
                    const storedAt = state._timestamp || 0;
                    
                    if (now - storedAt > CLEAR_USER_TIME) {
                        AsyncStorage.removeItem('userData-store');
                        state.userData = {
                            isAuthenticated: false,
                            user: null,
                        };
                    }
                }
            },
        }
    )
);

export default userStore;