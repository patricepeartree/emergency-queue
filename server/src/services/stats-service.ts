import { StatsRepository, QueueRepository } from "../repository";
import { StatsName } from "../repository/stats-repository";
import SystemStats from "../model/system-stats";

export async function getSystemStats(): Promise<SystemStats> {
    const [queueCount, callsInProgressStats, requestsProcessedTodayStats] = await Promise.all([
        QueueRepository.getQueueCount(),
        StatsRepository.getStatsByName(StatsName.CALLS_IN_PROGRESS),
        StatsRepository.getStatsByName(StatsName.REQUESTS_PROCESSED_TODAY)
    ]);

    return {
        callsOnQueue: queueCount || 0,
        callsInProgress: (callsInProgressStats || {}).value || 0,
        callsProcessedToday: (requestsProcessedTodayStats || {}).value || 0
    };
}


export async function handleNewCallInProgress() {
    return StatsRepository.incrementStatsValue(StatsName.CALLS_IN_PROGRESS);
}

export async function handleCallFinished() {
    return StatsRepository.decrementStatsValue(StatsName.CALLS_IN_PROGRESS);
}

export async function handleRequestFinished() {
    return StatsRepository.incrementStatsValue(StatsName.REQUESTS_PROCESSED_TODAY);
}

export function resetDailyStats() {
    return StatsRepository.resetMultiStatsValue([
        StatsName.REQUESTS_PROCESSED_TODAY
    ]);
}
