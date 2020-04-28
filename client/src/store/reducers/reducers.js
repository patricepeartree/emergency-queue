import {SAVE_CURRENT_REQUEST, SAVE_CALL_NOTES, SAVE_WELFARE_FREQUENCY, RESET_PATIENT_DATA} from "../actions/types";

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
               // welfareFrequency: action.payload.welfareCheckFrequency,
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

        case RESET_PATIENT_DATA:
            return {
                request: null,
                callNotes: null,
                welfareFrequency: null,
            };

        default:
            return state;
    }
};

export default appReducer;
