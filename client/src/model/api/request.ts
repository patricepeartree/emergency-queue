import {Patient} from "./patient";

export default interface Request {
    patient: Patient;
    phoneNumber: string;
    symptoms: string;
}
