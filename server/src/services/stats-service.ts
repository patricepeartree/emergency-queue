import { getQueueCount } from "../repository/queue-repository";
import { getRequestsWithStatusCount } from "../repository/request-repository";

import Stats from "../model/stats";
import { RequestStaus } from "../model/request";

export async function getSystemStats(): Promise<Stats> {
    const [queueCount, processingRequestsCount] = await Promise.all([
        getQueueCount(),
        getRequestsWithStatusCount(RequestStaus.PROCESSING)
    ]);
    
    return {
        callsOnQueue: queueCount,
        callsInProcess: processingRequestsCount
    };
}
