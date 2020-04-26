import Patient from "./patient";

export default interface Request {
    _id: string;
    patient: Patient;
    phoneNumber: string;
    symptoms: string;
}
