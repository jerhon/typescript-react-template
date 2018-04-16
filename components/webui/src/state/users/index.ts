import { Dispatch } from "redux";

import { getCurrentUser, IUser } from "../../model/user";
import { IApplicationState } from "../state";

enum ActionType {
    LOAD_USER          = "LOAD_USER",
    LOAD_USER_COMPLETE = "LOAD_USER_COMPLETE",
    LOAD_USER_ERROR    = "LOAD_USER_ERROR",
}

interface IAction {
    type: ActionType;
}

interface IUserComplete extends IAction {
    type: ActionType.LOAD_USER_COMPLETE;
    user: IUser;
}

interface IUserError extends IAction {
    type: ActionType.LOAD_USER_ERROR;
    error: any;
}

export { IUser };

export interface IUserState {
    current: IUser | null;
    loading: boolean;
    error: any | null;
}

export function requestUser() {
    return (dispatch: Dispatch<IAction>) => {
        dispatch(dispatch({ type: ActionType.LOAD_USER }));

        getCurrentUser().then((u) => {
            dispatch(dispatch({ type: ActionType.LOAD_USER_COMPLETE, user: u }));
        }).catch((err) => {
            dispatch(dispatch({ type: ActionType.LOAD_USER_ERROR, error: err }));
        });
    };
}

export function users(state: IUserState, action: IAction | IUserComplete) {
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
