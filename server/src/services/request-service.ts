import { RequestRepository, QueueRepository } from "../repository";
import Request, { RequestStatus } from "../model/request";
import { getNextId } from "../utils/request-util";

export async function saveNewRequest(request: Partial<Request>): Promise<number> {
    const smsId = getNextId();

    let finalRequest = {
        patient: { age: '', name: '' },
        phoneNumber: '',
        symptoms: '',
        status: RequestStatus.HOLD,
        smsId: smsId,
    };
    finalRequest = {
        ...finalRequest,
        ...request,
    };

    const id = await RequestRepository.saveToDatabase(finalRequest);
    await QueueRepository.addToQueue(id);
    return smsId;
}

export function getRequestById(id: string): Promise<Request | null> {
    return RequestRepository.getRequestById(id, {
        patient: 1,
        phoneNumber: 1,
        symptoms: 1
    });
}

export function getWelfareCheckRequestById(id: string): Promise<Request | null> {
    return RequestRepository.getRequestById(id, {
        patient: 1,
        phoneNumber: 1,
        symptoms: 1,
        callLogs: 1,
        welfareCheckFrequency: 1
    });
}