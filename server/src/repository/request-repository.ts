import {getDB} from "./init-mongo";
import Patient from "../model/patient";


export function saveToDatabase(patient: Patient) {
    const db = getDB();

    return db.collection('patient').insertOne(patient);
}
