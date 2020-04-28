import { getDB } from "./init-mongo";

const COLLECTION_NAME = "queue";

export enum Queue {
    NORMAL = "queue",
    WELFARE_CHECKS = "welfareCheckQueue"
}

export function getQueueCount(): Promise<number> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne({
        name: Queue.NORMAL
    }).then(res => res.queue.length);
}

export function addToQueue(id: string) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOneAndUpdate(
        {
            name: Queue.NORMAL
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

export function addManyToQueue(queueName: Queue, ids: string[]) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOneAndUpdate(
        {
            name: queueName
        },
        {
            $push: {
                queue: { $each: ids }
            }
        },
        {
            upsert: true
        }
    );
}

export function popFirstFromQueue(queueName: Queue) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOneAndUpdate(
        {
            name: queueName
        },
        {
            $pop: {
                queue: -1 // pop the first element of the array
            }
        }
    );
}

export function getQueuePosition(requestId: string): Promise<number> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne({
        name: Queue.NORMAL
    }).then(res => res.queue.indexOf(requestId.toString()) + 1);
}
