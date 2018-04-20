
import { Action, applyMiddleware, combineReducers, createStore, Dispatch, MiddlewareAPI, Reducer } from "redux";
import thunk from "redux-thunk";

import { getCurrentUser, IUserState, users } from "./users";

export interface IItem {
    name: string;
    description: string;
}

export interface IApplicationState {
    users: IUserState;
    items: IItem[];
}

const logger = (api: MiddlewareAPI<IApplicationState>) => {
    console.log('state', api.getState());
    return (next: Dispatch<IApplicationState>) => (action: Action) => {
        console.log("dispatching", action);
        return next(action);
    };
  };

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

const createStoreWithMiddleware = applyMiddleware(logger as any, thunk)(createStore);

export const store = createStoreWithMiddleware(reducers, createInitialState());
