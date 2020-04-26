export default interface Patient {
    name: string,
    age: string,
}

export interface FinishedPatient {
    _id: string,
    notes: string,
    welfareFrequency: WelfareFrequency,
}

export enum WelfareFrequency {
    DAILY = "DAILY",
    EVERY_OTHER_DAY = "EVERY_OTHER_DAY",
    BI_WEEKLY = "BI_WEEKLY",
    ONCE_A_WEEK = "ONCE_A_WEEK",
}
