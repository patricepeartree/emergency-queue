import Patient from "./patient";
import WelfareCheckFrequency from "./welfare-check-frequency";

export enum RequestStatus {
    HOLD = "hold",
    PROCESSING = "processing",
    PROCESSED = "processed"
}

interface RequestCallLog {
    date: Date;
    notes: string;
}

export default interface Request {
    patient: Patient;
    phoneNumber: string;
    symptoms: string;
    status: RequestStatus;
    smsId: number;
    callLogs?: RequestCallLog[];
    welfareCheckFrequency?: WelfareCheckFrequency;
}
