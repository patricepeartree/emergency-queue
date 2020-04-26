import { WelfareChecksRepository } from "../repository";
import WelfareCheckFrequency from "../model/welfare-check-frequency";

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

    // TODO we need to handle the error
    // return Promise.reject(new Error("Invalid welfare check periodicity."));
}
