import { IUserState } from "./users";

export interface IItem {
    name: string;
    description: string;
}

export interface IApplicationState {
    users: IUserState;
    items: IItem[];
}

export default function createInitialState(): IApplicationState {
    return {
        items: [],
        users : {
            current: null,
            error: null,
            loading: false,
        },
    };
}
