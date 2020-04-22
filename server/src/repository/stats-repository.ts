import { getDB } from "./init-mongo";

const COLLECTION_NAME = "stats";

export enum StatsName {
    CALLS_IN_PROCESS = "callsInProcess",
    REQUESTS_PROCESSED_TODAY = "requestsProcessedToday",
    AVERAGE_CALL_DURATION = "averageCallDuration"
}

interface Stats<E = any> {
    name: StatsName;
    value: number;
    extra?: E;
}

export function getStatsByName(name: StatsName): Promise<Stats | null> {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne<Stats>({
        name
    }, {
        projection: {
            value: 1
        }
    });
}

/**
 * Atomic mongo operation that recalculates the average call duration taking into
 * consideration a new call's duration.
 */
export function updateAvgCallDuration(duration: number) {
    const db = getDB();
    const collection = db.collection(COLLECTION_NAME);
    return collection.updateOne({
        name: StatsName.AVERAGE_CALL_DURATION
    }, [
        { $set: { totalSeconds: { $multiply: ["$value", "$extra.callsCount"] } } },
        {
            $set: {
                totalSeconds: { $sum: ["$totalSeconds", duration] },
                updatedCallsCount: { $sum: ["$extra.callsCount", 1] }
            }
        },
        {
            $set: {
                value: { $divide: ["$totalSeconds", "$updatedCallsCount"] },
                "extra.callsCount": "$updatedCallsCount"
            }
        },
        { $unset: ["totalSeconds", "updatedCallsCount"] }
    ], {
        upsert: true
    });
}
