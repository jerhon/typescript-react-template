
import { Action, applyMiddleware, combineReducers, createStore, Dispatch, MiddlewareAPI, Reducer } from "redux";
import thunk from "redux-thunk";


import { getCurrentUser, IUserState, IUser, users } from "./users";

export { IAction } from "./action";
export { getCurrentUser, IUserState, IUser, users } from "./users";

export interface IItem {
    name: string;
    description: string;
}

export interface IApplicationState {
    users: IUserState;
    items: IItem[];
}


// TODO: Add redux dev tools

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
  users,
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(reducers, createInitialState());
