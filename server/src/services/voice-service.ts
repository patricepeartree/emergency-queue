import Patient from "../model/patient";
import {saveToDatabase} from "../repository/request-repository";
import Request, {RequestStatus} from "../model/request";
import {setNext} from "../repository/queue-repository";


export async function saveNewRequest(request: Partial<Request>) {
    let finalRequest = {
        patient: { age: '', name: ''},
        phoneNumber: '',
        symptoms: '',
        status: RequestStatus.HOLD
    };
    finalRequest = {
        ... finalRequest,
        ... request,
    };
    const id = await saveToDatabase(finalRequest);
    await setNext(id);
}
