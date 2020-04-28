import { WelfareChecksRepository, QueueRepository } from "../repository";
import WelfareCheckFrequency from "../model/welfare-check-frequency";
import { Queue } from "../repository/queue-repository";

export async function setWelfareCheck(requestId: string, lastRun: Date, frequency: WelfareCheckFrequency) {
    let daysOffset;

    switch (frequency) {
        case WelfareCheckFrequency.DAILY:
            daysOffset = 1;
            break;
        case WelfareCheckFrequency.EVERY_OTHER_DAY:
            daysOffset = 2;
            break;
        case WelfareCheckFrequency.BI_WEEKLY:
            daysOffset = 3;
            break;
        case WelfareCheckFrequency.ONCE_A_WEEK:
            daysOffset = 7;
            break;
    }

    if (daysOffset) {
        const nextRun: Date = new Date(lastRun.getTime());
        nextRun.setDate(nextRun.getDate() + daysOffset);

        return WelfareChecksRepository.saveWelfareCheck(requestId, nextRun);
    }

    // TODO handle the error, if not caught the API call is left without response
    // return Promise.reject(new Error("Invalid welfare check periodicity."));
}

export async function processTodayWelfareChecks() {
    const today = new Date();
    
    const todayStart = new Date(today);
    todayStart.setHours(0);
    todayStart.setMinutes(0);
    todayStart.setSeconds(0);
    todayStart.setMilliseconds(0);

    const todayEnd = new Date(today);
    todayEnd.setHours(23);
    todayEnd.setMinutes(59);
    todayEnd.setSeconds(59);
    todayEnd.setMilliseconds(999);

    const docs = await WelfareChecksRepository.getWelfareChecksByDate(todayStart, todayEnd);
    
    const requestIds = (docs || []).map(doc => doc.requestId);
    await QueueRepository.addManyToQueue(Queue.WELFARE_CHECKS, requestIds);
}