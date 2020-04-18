import { getDB } from "./init-mongo";

const COLLECTION_NAME = "stats";

export enum StatsName {
    REQUESTS_PROCESSED_TODAY = "requestsProcessedToday"
};

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
