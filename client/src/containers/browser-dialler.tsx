import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import styled from "styled-components";
import { Device, Connection } from "twilio-client";
import { Icon, Button, Card, Segment, SemanticCOLORS } from "semantic-ui-react";

import { RootState } from "../store/store";
import APIUrls from "../constants/api-urls";

const CALL_STATUS_NOT_STARTED = 0;
const CALL_STATUS_IN_PROGRESS = 1;
const CALL_STATUS_COMPLETED = 2;
// enum CallStatus {
//     NOT_STARTED,
//     IN_PROGRESS,
//     COMPLETED
// }

const DIALLER_COLOR: { [key: number]: SemanticCOLORS } = Object.freeze({
    [CALL_STATUS_NOT_STARTED]: "yellow" as SemanticCOLORS,
    [CALL_STATUS_IN_PROGRESS]: "teal" as SemanticCOLORS,
    [CALL_STATUS_COMPLETED]: "grey" as SemanticCOLORS
});

const DIALLER_MESSAGE: { [key: number]: string } = Object.freeze({
    [CALL_STATUS_NOT_STARTED]: "Dial to connect to patient",
    [CALL_STATUS_IN_PROGRESS]: "Call in progress...",
    [CALL_STATUS_COMPLETED]: "Call ended"
});

function BrowserDialler() {
    const phoneNumber: string = useSelector((state: RootState) => state.appReducer.request.phoneNumber);

    const [callStatus, setCallStatus] = useState(CALL_STATUS_NOT_STARTED);

    const twilioDevice = useRef<Device>();
    const twilioConnection = useRef<Connection>();

    function startCall() {
        if (callStatus !== CALL_STATUS_NOT_STARTED) {
            return;
        }

        setCallStatus(CALL_STATUS_IN_PROGRESS);

        Axios.get(APIUrls.rest.callPatient.token).then(resp => {
            const { data } = resp || {};
            const { token } = data || {};

            if (token) {
                const device = new Device(token, {
                    enableRingingState: true,
                });
                twilioDevice.current = device;

                device.on("ready", () => {
                    const connection = device.connect({ number: phoneNumber });
                    twilioConnection.current = connection;
                });

                device.on("disconnect", onCallDisconnect);
            }
        });
    }

    function endCall() {
        if (twilioConnection.current) {
            twilioConnection.current.disconnect();
        }
    }

    function onCallDisconnect() {
        if (twilioDevice.current) {
            twilioDevice.current.destroy();
        }
        setCallStatus(CALL_STATUS_COMPLETED);
    }

    return (
        <DiallerCard centered>
            <DiallerSegment basic inverted color={DIALLER_COLOR[callStatus]} textAlign="center">
                <Icon name="user circle" size="massive" />
            </DiallerSegment>
            <Card.Content textAlign="center">
                <Card.Meta>
                    {DIALLER_MESSAGE[callStatus]}
                </Card.Meta>
                {callStatus === CALL_STATUS_NOT_STARTED
                    ? (
                        < DiallerButton icon onClick={startCall}>
                            <StartCallcon circular inverted color="green" name="phone" size="big" />
                        </DiallerButton>
                    ) : (
                        <DiallerButton icon disabled={callStatus !== CALL_STATUS_IN_PROGRESS} onClick={endCall}>
                            <EndCallIcon circular inverted color={callStatus === CALL_STATUS_IN_PROGRESS ? "red" : "grey"} name="phone" size="big" />
                        </DiallerButton>
                    )}
            </Card.Content>
        </DiallerCard>
    )
}

const DiallerCard = styled(Card)`
    height: 100%;

    &.ui.card>.content {
        flex-grow: unset;
    }    
`;

const DiallerSegment = styled(Segment)`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DiallerButton = styled(Button)`
    &.ui.button {
        background: none;
    }
`;

const StartCallcon = styled(Icon)`
    transform: rotate(90deg);
`;

const EndCallIcon = styled(Icon)`
    transform: rotate(-135deg);
`;

export default BrowserDialler;
