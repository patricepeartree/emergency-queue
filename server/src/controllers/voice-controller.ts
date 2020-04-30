import {twiml} from 'twilio';
import Request from "../model/request";

import Patient from "../model/patient";
import {RequestService} from "../services";

const tempData = new Map<string, Partial<Request>>();

export function askPatientName() {
    const twimlResponse = new twiml.VoiceResponse();

    const gather = twimlResponse.gather({
        input: ["speech"],
        action: "/api/voice/identification",
        timeout: 2,
        language: "en-GB"
    });

    gather.say({
        language: "en-GB"
    }, 'You have called the Emergency Health Line. Please tell me your name.');

    return twimlResponse;
}

export function askPatientAge() {
    const twimlResponse = new twiml.VoiceResponse();

    const gather = twimlResponse.gather({
        input: ["speech"],
        action: "/api/voice/age",
        timeout: 2,
        language: "en-GB"
    });

    gather.say({
        language: "en-GB"
    }, 'Please tell me your age.');

    return twimlResponse;
}

export function askPatientSymptoms() {
    const twimlResponse = new twiml.VoiceResponse();

    const gather = twimlResponse.gather({
        input: ["speech"],
        action: "/api/voice/symptoms",
        timeout: 2,
        language: "en-GB"
    });

    gather.say({
        language: "en-GB"
    }, 'What are your symptoms?');

    return twimlResponse;
}

export function finishCall() {
    const twimlResponse = new twiml.VoiceResponse();

    twimlResponse.say({
        language: "en-GB"
    }, 'Thank you, you will receive a SMS with a code of your request' +
        'and instructions to know your estimated holding time.');

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

export function savePermanently(callerId: string) {
    const request = tempData.get(callerId);
    if (request) {
        return RequestService.saveNewRequest(request);
    }
}
