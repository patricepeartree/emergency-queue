import Patient from "./patient";

interface RequestCallLog {
    date: string;
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
