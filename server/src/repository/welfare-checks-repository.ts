import { getDB } from "./init-mongo";

const COLLECTION_NAME = "welfareChecks";

export function saveWelfareCheck(requestId: string, nextRun: Date) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    collection.updateOne({
        requestId
    }, {
        $set: { nextRun }
    }, {
        upsert: true
    });
}

export function getWelfareChecksByDate(startDate: Date, endDate: Date) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.find({
        nextRun: {
            $gte: startDate,
            $lte: endDate

        }
    }, {
        projection: {
            _id: 0,
            requestId: 1
        }
    }).toArray();
}
