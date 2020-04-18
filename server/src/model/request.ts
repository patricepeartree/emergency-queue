import Patient from "./patient";

export enum RequestStatus {
    HOLD = "hold",
    PROCESSING = "processing",
    PROCESSED = "processed"
}

export default interface Request {
    patient: Patient;
    phoneNumber: string;
    symptoms: string,
    status: RequestStatus
}
