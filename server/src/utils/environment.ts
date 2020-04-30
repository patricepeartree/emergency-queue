import * as dotenv from "dotenv";

dotenv.config();

/* eslint no-process-env:0 */
const variables = {

    env: process.env.env,
    url: process.env.url,
    apiUrl: process.env.apiUrl,
    logLevel: process.env.logLevel,

    // Grab everything in you .env file here

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID_VOICE: process.env.TWILIO_ACCOUNT_SID_VOICE,
    TWILIO_AUTH_TOKEN_VOICE: process.env.TWILIO_AUTH_TOKEN_VOICE,
    RESPONDERS_TWILIO_TWIML_APP_SID: process.env.RESPONDERS_TWILIO_TWIML_APP_SID,
    RESPONDERS_TWILIO_NUMBER: process.env.RESPONDERS_TWILIO_NUMBER,

    PORT: process.env.PORT,

};

export default variables;
