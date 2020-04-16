import Patient from "./patient";

export enum RequestStaus {
    HOLD = "hold",
    PROCESSING = "processing",
    PROCESSED = "processed"
}

export default interface Request {
    patient: Patient;
    phoneNumber: string;
    status: RequestStaus
}
