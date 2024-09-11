import { AnimeSeason } from "../enums/enums";

export interface seasonInterface {
    year :number,
    season : AnimeSeason
}

export interface userInterface {
    _id: string;
    name: string;
    email: string;
    googleId?: string;
    avatar: {
        url: string;
        public_id?: string;
    };
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}