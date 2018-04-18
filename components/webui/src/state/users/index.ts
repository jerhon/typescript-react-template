import { Dispatch } from "redux";

<<<<<<< HEAD
import { getCurrentUser as gcu, IUser } from "../../model/user";
import { ActionType, IAction  } from "../action";
=======
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
>>>>>>> 863df32cb3c61b8cbb8fa6281e7c7cf7d93522fc

interface IUserComplete extends IAction {
    type: ActionType.LOAD_USER_COMPLETE;
    user: IUser;
}

interface IUserError extends IAction {
    type: ActionType.LOAD_USER_ERROR;
    error: any;
}

<<<<<<< HEAD
=======
export { IUser };

>>>>>>> 863df32cb3c61b8cbb8fa6281e7c7cf7d93522fc
export interface IUserState {
    current: IUser | null;
    loading: boolean;
    error: any | null;
}

<<<<<<< HEAD
export function usersReducer(state: IUserState, action: IAction | IUserComplete) {
=======
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
>>>>>>> 863df32cb3c61b8cbb8fa6281e7c7cf7d93522fc
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
<<<<<<< HEAD

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
=======
>>>>>>> 863df32cb3c61b8cbb8fa6281e7c7cf7d93522fc
