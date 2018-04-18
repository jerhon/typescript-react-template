import { Dispatch } from "redux";

import { getCurrentUser as gcu, IUser } from "../../model/user";
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

export function usersReducer(state: IUserState, action: IAction | IUserComplete) {
    if (action.type === ActionType.LOAD_USER_COMPLETE) {
        state.loading = false;
        state.current = (action as IUserComplete).user;
    } else if (action.type === ActionType.LOAD_USER) {
        state.loading = true;
        state.current = null;
    } else if (action.type === ActionType.LOAD_USER_ERROR) {
        state.loading = false;
        state.error = action as IUserError;
    }
}

export function getCurrentUser() {
    return (dispatch: Dispatch<IAction>) => {
        dispatch(dispatch({ type: ActionType.LOAD_USER }));

        gcu().then((u) => {
            dispatch(dispatch({ type: ActionType.LOAD_USER_COMPLETE, user: u }));
        }).catch((err) => {
            dispatch(dispatch({ type: ActionType.LOAD_USER_ERROR, error: err }));
        });
    };
}
