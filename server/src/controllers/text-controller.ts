import { Twilio, twiml } from "twilio";

import { TextService } from "../services";
import { RequestErrors } from "../utils/request-util";
import variables from "../utils/environment";

const accountSid = variables.TWILIO_ACCOUNT_SID || "";
const authToken = variables.TWILIO_AUTH_TOKEN || "";

const client = new Twilio(accountSid, authToken);

export function sendSmsId(smsId: number, to: string) {
    return client.messages.create({
        from: variables.INCOMING_TWILIO_NUMBER,
        body: 'Your call to Emergency Health Line has been registered. ' +
            'To know your estimated hold time, please send a SMS ' +
            `to ${variables.INCOMING_TWILIO_NUMBER} only with your code: ${smsId}`,
        to: to
    });
}

export async function getPatientHoldTime(smsId: number) {
    const twimlResponse = new twiml.MessagingResponse();

    try {
        const holdTime = await TextService.getHoldTimeById(smsId);
        twimlResponse.message(`Your estimated holding time is of ${holdTime} minute(s).`);
    } catch (e) {
        if (e === RequestErrors.NOT_A_VALID_ID) {
            twimlResponse.message(`Your message is not in the valid format.`);
        } else {
            throw e;
        }
    }

    return twimlResponse;
}
