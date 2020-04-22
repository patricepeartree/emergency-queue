import {QueueRepository, RequestRepository, StatsRepository} from "../repository";
import {StatsName} from "../repository/stats-repository";


export async function getHoldTimeById(smsId: number) {
    const requestId = await RequestRepository.getRequestId(smsId);
    const queuePosition = await QueueRepository.getQueuePosition(requestId);
    const holdtimeDoc = await StatsRepository.getStatsByName(StatsName.ESTIMATED_HOLD_TIME);
    const holdtime = (holdtimeDoc || [])[0];

    return (((holdtime || {}).value || 0) * queuePosition);
}
