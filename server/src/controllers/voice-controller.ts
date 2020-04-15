import { twiml } from 'twilio';
import {Request} from "express";
import Patient from "../model/patient";
import {findSourceMap} from "module";

const tempData = new Map<string,Patient>();

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

export function saveTemporarily(key: string, req: Request) {
    const { Caller, SpeechResult } = req.body || {};
    const patient = tempData.get(Caller) || { age: "", name: "", symptoms: "" };
    const finalPatient = {
        ...patient,
        [key]: SpeechResult
    };
    tempData.set(Caller, finalPatient);
}

export function savePermanently(req: Request) {
    const { Caller } = req.body || {};
    console.log(tempData.get(Caller));
    // TODO put in mongo
}
