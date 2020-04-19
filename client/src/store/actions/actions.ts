import Request from '../../model/api/request'
import {SAVE_CURRENT_REQUEST} from "./types";

export const saveRequest = (request: Request) => ({ type: SAVE_CURRENT_REQUEST, payload: request });
