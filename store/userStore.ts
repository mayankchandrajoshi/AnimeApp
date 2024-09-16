import { create } from 'zustand';
import { userInterface } from '../interface/commonInterface';

const CLEAR_USER_TIME = 7 * 24 * 60 * 60 * 1000;

interface userDataState {
    userData: {
        isAuthenticated : boolean,
        user : userInterface|null
    };
    login : (data:userInterface) => void;
    logout : () => void;
}

const userStore = create<userDataState>()(
    (set,get) => ({
        userData:{
            isAuthenticated:false,
            user:null
        },
        login:(data: userInterface) => set((state) => ({
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
    })
);

export default userStore;