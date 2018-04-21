import { Dispatch } from "redux";

import { getCurrentUserApi, IUser } from "../../model/user";
import { ActionType, IAction  } from "../action";

interface IUserComplete extends IAction {
    type: ActionType.LOAD_USER_COMPLETE;
    user: IUser;
}

interface IUserError extends IAction {
    type: ActionType.LOAD_USER_ERROR;
    error: any;
}

export interface IUserState {
    current: IUser | null;
    loading: boolean;
    error: any | null;
}

export { IUser } from '../../model/user'

export function users(state: IUserState, action: IAction | IUserComplete) {
    console.log('action: ', action.type);
    if (action.type === ActionType.LOAD_USER_COMPLETE) {
        
        return { ...state, loading: false, current: (action as IUserComplete).user };
    } else if (action.type === ActionType.LOAD_USER) {
        return {... state, loading: true, current: null };
    } else if (action.type === ActionType.LOAD_USER_ERROR) {
        return {...state, loading: false, current: null, error: (action as IUserError).error}
    } else {
        return { loading: false, current: null, error: null };
    }
}

export function getCurrentUser() {
    return (dispatch: Dispatch<IAction>) => {
        console.log('dispatched!');
        dispatch({ type: ActionType.LOAD_USER });

        getCurrentUserApi().then((u) => {
            dispatch({ type: ActionType.LOAD_USER_COMPLETE, user: u });
        }).catch((err) => {
            dispatch({ type: ActionType.LOAD_USER_ERROR, error: err });
        });
    };
}
