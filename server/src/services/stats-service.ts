import { StatsRepository, QueueRepository, RequestRepository } from "../repository";
import { SystemStats } from "../model";
import { StatsName } from "../repository/stats-repository";


export async function getSystemStats(): Promise<SystemStats> {
    const [queueCount, callsInProcessStats, requestsProcessedTodayStats] = await Promise.all([
        QueueRepository.getQueueCount(),
        StatsRepository.getStatsByName(StatsName.CALLS_IN_PROCESS),
        StatsRepository.getStatsByName(StatsName.REQUESTS_PROCESSED_TODAY)
    ]);

    return {
        callsOnQueue: queueCount || 0,
        callsInProcess: (callsInProcessStats || {}).value || 0,
        callsProcessedToday: (requestsProcessedTodayStats || {}).value || 0
    };
}
