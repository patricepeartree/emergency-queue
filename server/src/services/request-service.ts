
import { RequestRepository, QueueRepository } from "../repository";
import Request, { RequestStatus } from "../model/request";


export async function saveNewRequest(request: Partial<Request>) {
    let finalRequest = {
        patient: { age: '', name: '' },
        phoneNumber: '',
        symptoms: '',
        status: RequestStatus.HOLD
    };
    finalRequest = {
        ...finalRequest,
        ...request,
    };
    
    const id = await RequestRepository.saveToDatabase(finalRequest);
    await QueueRepository.addToQueue(id);
}

export function getRequestById(id: string): Promise<Request | null> {
    return RequestRepository.getRequestById(id, {
        patient: 1,
        phoneNumber: 1,
        symptoms: 1
    });
}
