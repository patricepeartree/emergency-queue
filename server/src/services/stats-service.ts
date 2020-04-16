import { getQueueCount, getRequestsWithStatusCount } from "../queue-repository";

import Stats from "../model/stats";

export async function getSystemStats(): Promise<Stats> {
    const [queueCount, processingRequestsCount] = await Promise.all([
        getQueueCount(),
        getRequestsWithStatusCount()
    ]);
    
    return {
        callsOnQueue: queueCount,
        callsInProcess: processingRequestsCount
    };
}
