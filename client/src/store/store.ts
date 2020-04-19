import { combineReducers } from 'redux'
import appReducer from "./reducers/reducers";


const reducers = combineReducers({
    appReducer
});

export type RootState = ReturnType<typeof reducers>

export default reducers;
