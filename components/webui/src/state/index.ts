
import { applyMiddleware, combineReducers, createStore, Reducer } from "redux";
import thunk from "redux-thunk";

import { getCurrentUser, IUserState, usersReducer } from "./users";

export interface IItem {
    name: string;
    description: string;
}

export interface IApplicationState {
    users: IUserState;
    items: IItem[];
}

function createInitialState(): IApplicationState {
    return {
        items: [],
        users : {
            current: null,
            error: null,
            loading: false,
        },
    };
}

const reducers = combineReducers({
  usersReducer,
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(reducers, createInitialState());
