import Request, {RequestCallLog} from '../model/api/request'

export function toClientRequest(serverRequest: Request): Request {
    const callLogs: RequestCallLog[] = [];

    const clientRequest = {
        ...serverRequest,
    };
if(clientRequest.callLogs) {
    clientRequest.callLogs = serverRequest.callLogs.reduce((acc, it) => {
        const calllog: RequestCallLog = { date: new Date(it.date), notes: it.notes };
        acc.push(calllog);
        return acc;
    }, callLogs);
}


    return clientRequest;
}
