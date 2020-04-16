import { getDB } from "./init-mongo";

const COLLECTION_NAME = "queue";

export function getQueueCount(): Promise<number> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.find({}).count();
}
