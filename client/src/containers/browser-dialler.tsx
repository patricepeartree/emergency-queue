import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import styled from "styled-components";
import { Device, Connection } from "twilio-client";
import { Icon, Button, Card, Segment } from "semantic-ui-react";

import { RootState } from "../store/store";
import APIUrls from "../constants/api-urls";

function BrowserDialler() {
    const phoneNumber: string = useSelector((state: RootState) => state.appReducer.request.phoneNumber);

    const [callInProgress, setCallInProgress] = useState<boolean>(false);

    const twilioDevice = useRef<Device>();
    const twilioConnection = useRef<Connection>();

    function startCall() {
        if (callInProgress) {
            return;
        }

        setCallInProgress(true);

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
        setCallInProgress(false);
    }

    return (
        <DiallerCard centered>
            <DiallerSegment basic inverted color={callInProgress ? "teal" : "grey"} textAlign="center">
                <Icon name="user circle" size="massive" />
            </DiallerSegment>
            <Card.Content textAlign="center">
                <Card.Meta>
                    {callInProgress ? "Call in progress..." : "Dial to connect to patient"}
                </Card.Meta>
                {callInProgress
                    ? (
                        <DiallerButton icon onClick={endCall}>
                            <EndCallIcon circular inverted name="phone" size="big" color="red" />
                        </DiallerButton>
                    ) : (
                        < DiallerButton icon onClick={startCall}>
                            <StartCallcon circular inverted name="phone" size="big" color="green" />
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
