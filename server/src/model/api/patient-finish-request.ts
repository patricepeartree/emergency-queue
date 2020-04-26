import WelfareCheckFrequency from "../welfare-check-frequency";

export default interface PatientFinishRequest {
    id: string;
    notes: string;
    welfareFrequency: WelfareCheckFrequency;
}
