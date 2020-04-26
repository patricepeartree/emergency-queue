import {SAVE_CURRENT_REQUEST, SAVE_CALL_NOTES, SAVE_WELFARE_FREQUENCY} from "../actions/types";

const initialState = {
    request: null,
    callNotes: null,
    welfareFrequency: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CURRENT_REQUEST:
            return {
                ...state,
                request: action.payload,
            };

        case SAVE_CALL_NOTES:
            return {
                ...state,
                callNotes: action.payload
            };

        case SAVE_WELFARE_FREQUENCY:
            return {
                ...state,
                welfareFrequency: action.payload
            };

        default:
            return state;
    }
};

export default appReducer;
