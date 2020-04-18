import { getDB } from "./init-mongo";

import Patient from "../model/patient";
import Request, { RequestStatus } from "../model/request";

const COLLECTION_NAME = "requests";

export function saveToDatabase(request: Request): Promise<string>  {
    const db = getDB();
    return db.collection(COLLECTION_NAME).insertOne(request).then((resp) => {
        return resp.insertedId.toString();
    });
}

export function getRequestsWithStatusCount(status: RequestStatus): Promise<number> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.find({
        status
    }).count();
}
