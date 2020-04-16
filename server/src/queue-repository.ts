// import { getDatabaseConnection } from "./";

const COLLECTION_NAME = "queue";

const db = getDatabaseConnection();

export function getQueueCount(): Promise<number> {
    const collection = db.collection(COLLECTION_NAME);
    return collection.find({}).countDocuments();
}

export function getRequestsWithStatusCount(status: string): Promise<number> {
    const collection = db.collection(COLLECTION_NAME);
    return collection.find({
        status
    }).countDocuments();
}
