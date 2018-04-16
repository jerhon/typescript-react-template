import { combineReducers } from "redux";

import { IApplicationState } from "./state";
import { users } from "./users";

export const reducers = combineReducers<IApplicationState>({
  users,
});
