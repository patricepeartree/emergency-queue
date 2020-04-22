import {Twilio, twiml} from "twilio";
import {TextService} from "../services";
import {RequestErrors} from "../utils/request-util";

const accountSid = 'AC47b85ae425ff7eaf33b7e7cec6677557';
const authToken = '989248adebd4c3d425e095200c30cc40';
const client = new Twilio(accountSid, authToken);

export function sendSmsId(smsId: number, to: string) {
   return  client.messages.create({
        from: '+48732483267',
        body: 'Your call to Emergency Health Line has been registered. ' +
            'To know your estimated hold time, please send a SMS ' +
            `to 303 800 100 only with your code: ${smsId}`,
        to: to
    });
}


export async function getPatientHoldTime(smsId: number) {
    const twimlResponse = new twiml.MessagingResponse();

    try {
        const holdTime = await TextService.getHoldTimeById(smsId);
        twimlResponse.message(`Your estimated holding time is of ${holdTime} minutes.`);
    } catch (e) {
        if (e === RequestErrors.NOT_A_VALID_ID) {
            twimlResponse.message(`Your message is not in the valid format.`);
        } else {
            throw e;
        }
    }

    return twimlResponse;
}
