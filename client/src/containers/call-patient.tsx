import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Device } from "twilio-client";

import APIUrls from "../constants/api-urls";

function CallPatient() {
    const [call, setCall] = useState(false);
    const [onCall, setOnCall] = useState(false);

    useEffect(() => {
        if (call) {
            Axios.get(APIUrls.rest.callPatient.token).then(resp => {
                const { data } = resp || {};
                const { token } = data || {};
                if (token) {
                    const device = new Device(token, {
                        enableRingingState: true,
                        debug: true
                    });

                    device.ready(() => {
                        console.log("READY");
                        const connection = device.connect({ number: "+351968405207" });
                        connection.on("accept", () => console.log("Accept"));
                        connection.on("reject", () => console.log("Rejected :("));
                        connection.on("disconnect", () => {
                            // TODO destroy device
                            console.log("Disconnected from call");
                        });
                        connection.on("error", (err) => console.error(err));
                        connection.on("ringing", () => console.log("ringing"));
                        connection.on("reconnecting", (err) => console.log(err));
                    });

                    device.on("cancel", () => console.log("device CANCEL"));
                    device.on("connect", () => console.log("device CONNECT"));
                    device.on("disconnect", () => console.log("device DISCONNECT"));
                    device.on("error", () => console.log("device ERROR"));
                    device.on("offline", () => {
                        // TODO handle token not generated here?
                        console.log("device OFFLINE");
                    });
                }
            });
        }
    }, [call]);

    return (
        <button onClick={() => setCall(true)}>CALL</button>

    )
}

export default CallPatient;
