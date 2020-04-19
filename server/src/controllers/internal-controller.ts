import { RequestService, QueueService } from "../services";
import Request from "../model/request";


export async function getNextRequestInQueue(): Promise<Request | null> {
    const id = await QueueService.getNextIdInQueue();
    if (id) {
        return RequestService.getRequestById(id);
    }
    return null;
}
