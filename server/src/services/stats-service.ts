import { StatsRepository, QueueRepository, RequestRepository } from "../repository";
import { SystemStats } from "../model";
import { StatsName } from "../repository/stats-repository";


export async function getSystemStats(): Promise<SystemStats> {
    const [queueCount, processingRequestsCount, requestsProcessedTodayCount] = await Promise.all([
        QueueRepository.getQueueCount(),
        getCountStats(StatsName.CALLS_IN_PROCESS),
        getCountStats(StatsName.REQUESTS_PROCESSED_TODAY)
    ]);

    return {
        callsOnQueue: queueCount,
        callsInProcess: processingRequestsCount,
        callsProcessedToday: requestsProcessedTodayCount
    };
}

async function getCountStats(name: StatsName) {
    const docs = await StatsRepository.getStatsByName(name);

    if (!docs) {
        console.log(`### WARN: There are no Stats object for \"${name}\". System statystics might be incorrect.`);
    }
    if (docs && docs.length > 1) {
        console.log(`### WARN: There are more that one Stats objects for \"${name}\". System statystics might be incorrect.`);
    }
    
    const doc = (docs || [])[0];
    return (doc || {}).value || 0;
}
