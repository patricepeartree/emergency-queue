import { getDB } from "./init-mongo";

const COLLECTION_NAME = "stats";

export enum StatsName {
    CALLS_IN_PROCESS = "callsInProcess",
    REQUESTS_PROCESSED_TODAY = "requestsProcessedToday",
    ESTIMATED_HOLD_TIME = "estimatedHoldTime"
}

export function getStatsByName(name: StatsName): Promise<{ value: any }[]> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.find<{ name: string, value: any }>({
        name
    }, {
        projection: {
            value: 1
        }
    }).toArray();
}
