import {QueueRepository, RequestRepository, StatsRepository} from "../repository";
import {StatsName} from "../repository/stats-repository";


export async function getHoldTimeById(smsId: number) {
    const requestId = await RequestRepository.getRequestId(smsId);
    const queuePosition = await QueueRepository.getQueuePosition(requestId);
    const averageCallDurationStats = await StatsRepository.getStatsByName(StatsName.AVERAGE_CALL_DURATION);

    return ((averageCallDurationStats || {}).value || 0) * queuePosition;
}
