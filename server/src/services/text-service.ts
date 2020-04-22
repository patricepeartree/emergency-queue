import {QueueRepository, RequestRepository, StatsRepository} from "../repository";
import {StatsName} from "../repository/stats-repository";
import {RequestErrors} from "../utils/request-util";


export async function getHoldTimeById(smsId: number) {
    if (isNaN(smsId)) throw RequestErrors.NOT_A_VALID_ID;


    const requestId = await RequestRepository.getRequestId(smsId);
    const queuePosition = await QueueRepository.getQueuePosition(requestId);
    const holdtimeDoc = await StatsRepository.getStatsByName(StatsName.ESTIMATED_HOLD_TIME);
    const holdtime = (holdtimeDoc || [])[0];

    if(((holdtime || {}).value || 0)) {
        return 1;
    } else {
        return (((holdtime || {}).value || 0) / 60) * queuePosition;
    }
}
