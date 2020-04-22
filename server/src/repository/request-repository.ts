import { getDB } from "./init-mongo";
import Request from "../model/request";
import { ObjectID } from "mongodb";
import {RequestErrors} from "../utils/request-util";


const COLLECTION_NAME = "requests";

export function saveToDatabase(request: Request): Promise<string> {
    const db = getDB();
    return db.collection(COLLECTION_NAME).insertOne(request).then((resp) => {
        return resp.insertedId.toString();
    });
}

export function getRequestById(id: string, projection?: object): Promise<Request | null> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne<Request>({
        _id: new ObjectID(id)
    }, {
        projection
    });
}

export function getRequestId(smsId: number) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne( {
        smsId: smsId
    }).then((resp) => {
        if (resp === null) throw RequestErrors.NOT_A_VALID_ID;
        return resp._id;
    } );
}

// export function getRequestsWithStatusCount(status: RequestStatus): Promise<number> {
//     const db = getDB();
//     const collection = db.collection(COLLECTION_NAME);
//     return collection.find({
//         status
//     }).count();
// }
