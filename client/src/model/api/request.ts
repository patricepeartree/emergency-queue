import Patient from "./patient";

export interface RequestCallLog {
    date: Date;
    notes: string;
}

export default interface Request {
    _id: string;
    patient: Patient;
    phoneNumber: string;
    symptoms: string;
    callLogs: RequestCallLog[];
    welfareCheckFrequency: string;
}
