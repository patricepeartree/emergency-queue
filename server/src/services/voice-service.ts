import Patient from "../model/patient";
import {saveToDatabase} from "../repository/request-repository";

export async function savePatientData(patient: Patient) {
    //add to mongo
    await saveToDatabase(patient);

}
