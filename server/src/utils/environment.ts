import * as dotenv from "dotenv";

dotenv.config();

const variables = {

    env: process.env.env,
    url: process.env.url,
    apiUrl: process.env.apiUrl,
    logLevel: process.env.logLevel,

    // Grab everything in you .env file here

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    INCOMING_TWILIO_NUMBER: process.env.INCOMING_TWILIO_NUMBER,
    RESPONDERS_TWILIO_TWIML_APP_SID: process.env.RESPONDERS_TWILIO_TWIML_APP_SID,
    RESPONDERS_TWILIO_NUMBER: process.env.RESPONDERS_TWILIO_NUMBER,

    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    // PORT: process.env.PORT

};

export default variables;
