import Request from '../../model/api/request'
import { SAVE_CURRENT_REQUEST, SAVE_CALL_NOTES } from "./types";

export const saveRequest = (request: Request) => ({
    type: SAVE_CURRENT_REQUEST,
    payload: request
});

export const saveCallNotes = (notes: string) => ({
    type: SAVE_CALL_NOTES,
    payload: notes
});
