import { QueueRepository, RequestRepository, StatsRepository } from "../repository";
import { StatsName } from "../repository/stats-repository";
import { RequestErrors } from "../utils/request-util";


export async function getHoldTimeById(smsId: number) {
    if (isNaN(smsId)) {
        throw RequestErrors.NOT_A_VALID_ID;
    }

    const requestId = await RequestRepository.getRequestId(smsId);
    const queuePosition = await QueueRepository.getQueuePosition(requestId);
    const averageCallDurationStats = await StatsRepository.getStatsByName(StatsName.AVERAGE_CALL_DURATION);

    const averageCallDuration = (averageCallDurationStats || {}).value || 0;

    if (!averageCallDuration) {
        return 1;
    }

    return (averageCallDuration / 60) * queuePosition;
}
