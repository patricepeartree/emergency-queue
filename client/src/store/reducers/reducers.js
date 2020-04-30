import {
    SAVE_CURRENT_REQUEST,
    SAVE_CALL_NOTES,
    SAVE_WELFARE_FREQUENCY,
    RESET_PATIENT_DATA,
    TOGGLE_MODAL, CHANGE_MODAL_MESSAGE
} from "../actions/types";

const initialState = {
    request: null,
    callNotes: null,
    welfareFrequency: null,
    modalOpen: false,
    modalMessage: '',
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

        case RESET_PATIENT_DATA:
            return {
                ...state,
                request: null,
                callNotes: null,
                welfareFrequency: null,
            };
           case TOGGLE_MODAL:
            return {
                ...state,
                modalOpen: action.payload,
            };

        case CHANGE_MODAL_MESSAGE:
            return {
                ...state,
                modalMessage: action.payload,
                modalOpen: true,
            };


        default:
            return state;
    }
};

export default appReducer;
