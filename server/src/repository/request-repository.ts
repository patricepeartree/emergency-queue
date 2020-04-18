import { getDB } from "./init-mongo";

import Patient from "../model/patient";
import { RequestStatus } from "../model/request";

const COLLECTION_NAME = "requests";

export function saveToDatabase(patient: Patient) {
    const db = getDB();
    return db.collection(COLLECTION_NAME).insertOne(patient);
}

export function getRequestsWithStatusCount(status: RequestStatus): Promise<number> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.find({
        status
    }).count();
}
