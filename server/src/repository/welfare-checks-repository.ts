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
