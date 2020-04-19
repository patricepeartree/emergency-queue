import Request from '../../model/api/request'
import {SAVE_CURRENT_REQUEST} from "../actions/types";


const initialState = {
    request: Request,
};

const appReducer = (state = initialState, action) => {
    if (action.type === SAVE_CURRENT_REQUEST) {
        return {
            ...state,
            request: action.payload,
        };
    } else {
        return state
    }

};

export default appReducer
