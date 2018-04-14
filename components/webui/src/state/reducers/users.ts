import { IApplicationState } from "../state";

enum ActionType {
    LOAD_USER = "LOAD_USER",
    LOAD_USER_COMPLETE = "LOAD_USER_COMPLETE",
    LOAD_USER_FAILED = "LOAD_USER_FAILED",
}

export interface IAction {
    type: ActionType;
}

export interface IUserComplete extends IAction {
    type: ActionType.LOAD_USER_COMPLETE;
}

export function storeUser(state: IApplicationState, action: IAction) {
    if (action.type === ActionType.LOAD_USER) {
        
    }
}

