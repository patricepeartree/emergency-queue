import { getQueueCount } from "../repository/queue-repository";
import { getRequestsWithStatusCount } from "../repository/request-repository";

import { RequestStatus } from "../model/request";
import { StatsRepository } from "../repository";
import { SystemStats } from "../model";

export async function getSystemStats(): Promise<SystemStats> {
    const [queueCount, processingRequestsCount, requestsProcessedTodayCount] = await Promise.all([
        getQueueCount(),
        getRequestsWithStatusCount(RequestStatus.PROCESSING),
        getRequestsProcessedTodayCount()
    ]);

    return {
        callsOnQueue: queueCount,
        callsInProcess: processingRequestsCount,
        callsProcessedToday: requestsProcessedTodayCount
    };
}

async function getRequestsProcessedTodayCount() {
    const docs = await StatsRepository.getStatsByName(StatsRepository.StatsName.REQUESTS_PROCESSED_TODAY);

    if (!docs) {
        console.log(`### WARN: There are no Stats object for ${StatsRepository.StatsName.REQUESTS_PROCESSED_TODAY} in the database. System statystics might be incorrect.`);
    }
    if (docs && docs.length > 1) {
        console.log(`### WARN: There are more that one Stats object for ${StatsRepository.StatsName.REQUESTS_PROCESSED_TODAY} in the database. System statystics might be incorrect.`);
    }
    
    const doc = (docs || [])[0];
    return (doc || {}).value || 0;
}
