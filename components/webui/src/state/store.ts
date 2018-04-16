import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import createInitialState from "./state";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(reducers, createInitialState() );
