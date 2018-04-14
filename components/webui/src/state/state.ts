
export interface IApplicationState {
    items: IItem[];
    currentUser: IUser | null;
    currentUserLoading: boolean;
}

export interface IUser {
    username: string;
    name: string;
}

export interface IItem {
    name: string;
    description: string;
}

export default function createInitialState(): IApplicationState {
    return {
        currentUser: null,
        currentUserLoading: false,
        items: [],
    };
}
