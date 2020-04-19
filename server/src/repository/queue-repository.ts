import { getDB } from "./init-mongo";


const COLLECTION_NAME = "queue";
const QUEUE_DOC_NAME = "queue";

export function getQueueCount(): Promise<number> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.find({}).count();
}

export function addToQueue(id: string) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOneAndUpdate(
        {
            name: QUEUE_DOC_NAME
        },
        {
            $push: {
                queue: id
            }
        },
        {
            upsert: true
        }
    );
}

export function popFirstFromQueue() {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOneAndUpdate(
        {
            name: QUEUE_DOC_NAME
        },
        {
            $pop: {
                queue: -1 // pop the first element of the array
            }
        }
    );
}