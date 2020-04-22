import {Twilio, twiml} from "twilio";
import {TextService} from "../services";

const accountSid = 'AC47b85ae425ff7eaf33b7e7cec6677557';
const authToken = '989248adebd4c3d425e095200c30cc40';
const client = new Twilio(accountSid, authToken);

export function sendSmsId(smsId: number, to: string) {
   return  client.messages.create({
        from: '+48732483267',
        body: 'A sua chamada para a Saúde 24 foi registada. ' +
            'Para saber o tempo esperado para lhe ligarem, envie SMS ' +
            `para 303 800 100 com o código: ${smsId}`,
        to: to
    });
}


export async function getPatientHoldTime(smsId: number) {
    const holdTime = await TextService.getHoldTimeById(smsId);

    const twimlResponse = new twiml.MessagingResponse();
    twimlResponse.message(`O tempo de espera estimado até lhe ligarem é ${holdTime} minutos.`);

    return twimlResponse;
}
