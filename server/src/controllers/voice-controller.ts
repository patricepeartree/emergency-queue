import { twiml } from 'twilio';
import Request from "../model/request";

import Patient from "../model/patient";
import { RequestService } from "../services";

const tempData = new Map<string, Partial<Request>>();

export function askPatientName() {
    const twimlResponse = new twiml.VoiceResponse();

    const gather = twimlResponse.gather({
        input: ["speech"],
        action: "/api/voice/identification",
        timeout: 3,
        language: "pt-PT"
    });

    gather.say({
        language: "pt-PT"
    }, 'Chegou à linha saúde 24. Diga-me o seu nome');

    return twimlResponse;
}

export function askPatientAge() {
    const twimlResponse = new twiml.VoiceResponse();

    const gather = twimlResponse.gather({
        input: ["speech"],
        action: "/api/voice/age",
        timeout: 3,
        language: "pt-PT"
    });

    gather.say({
        language: "pt-PT"
    }, 'Diga-me a sua idade');

    return twimlResponse;
}

export function askPatientSymptoms() {
    const twimlResponse = new twiml.VoiceResponse();

    const gather = twimlResponse.gather({
        input: ["speech"],
        action: "/api/voice/symptoms",
        timeout: 3,
        language: "pt-PT"
    });

    gather.say({
        language: "pt-PT"
    }, 'Por favor, descreva os seus sintomas');

    return twimlResponse;
}

export function finishCall() {
    const twimlResponse = new twiml.VoiceResponse();

    twimlResponse.say({
        language: "pt-PT",
    }, 'Obrigada, irá receber uma SMS com o número do seu pedido e instruções para consultar o tempo de espera.');

    twimlResponse.hangup();

    return twimlResponse;
}

export function savePatientTemporarily(callerId: string, key: string, value: string){
    const request = tempData.get(callerId) || {};
    const { patient = {} } = request;
    const finalPatient = {
        ...patient,
        [key]: value
    };
    saveRequestTemporarily(callerId, 'patient', finalPatient);
}

export function saveRequestTemporarily(callerId: string, key: string, value: string | Partial<Patient>) {
    const request = tempData.get(callerId) || {};
    const finalRequest = {
        ...request,
        [key]: value
    };
    tempData.set(callerId, finalRequest);
}

export async function savePermanently(callerId: string) {
    const request = tempData.get(callerId);
    if (request) {
        await RequestService.saveNewRequest(request);
    }
}
