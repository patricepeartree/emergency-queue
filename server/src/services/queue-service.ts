import { QueueRepository } from "../repository";

export function getNextIdInQueue(): Promise<string | null> {
    return getNextIdInQueueByQueueName(QueueRepository.Queue.NORMAL);
}

export function getNextIdInWelfareChecksQueue(): Promise<string | null> {
    return getNextIdInQueueByQueueName(QueueRepository.Queue.WELFARE_CHECKS);
}

async function getNextIdInQueueByQueueName(queueName: QueueRepository.Queue): Promise<string | null> {
    const result = await QueueRepository.popFirstFromQueue(queueName); // returns the original document before being updated

    const { ok, value } = result || {};
    const { queue } = value || {};

    if (ok === 1) { // is 1 if the update executed correctly
        return (queue || [])[0];
    }
    return null; // TODO log lastErrorObject if update failed
}
