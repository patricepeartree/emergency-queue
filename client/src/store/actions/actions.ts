import Request from '../../model/api/request'
import {
    SAVE_CURRENT_REQUEST,
    SAVE_CALL_NOTES,
    SAVE_WELFARE_FREQUENCY,
    RESET_PATIENT_DATA,
    TOGGLE_MODAL,
    CHANGE_MODAL_MESSAGE
} from "./types";

export const saveRequest = (request: Request) => ({
    type: SAVE_CURRENT_REQUEST,
    payload: request
});

export const saveCallNotes = (notes: string) => ({
    type: SAVE_CALL_NOTES,
    payload: notes
});

export const saveWelfareFrequency = (welfareFrequency: string) => ({
    type: SAVE_WELFARE_FREQUENCY,
    payload: welfareFrequency
});

export const resetPatient = () => ({
    type: RESET_PATIENT_DATA,
});

export const toggleModal = (state: boolean) => ({
    type: TOGGLE_MODAL,
    payload: state
});

export const changeModalMessage = (message: string) => ({
    type: CHANGE_MODAL_MESSAGE,
    payload: message
});
