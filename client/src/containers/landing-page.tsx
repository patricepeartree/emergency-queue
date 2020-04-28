import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";

import APIUrls from "../constants/api-urls";
import {resetPatient, saveRequest} from "../store/actions/actions";
import styled from "styled-components";

function LandingPage() {
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(resetPatient());
    });

    function getNextPatient() {
        axios.get(APIUrls.rest.getNextPatient)
            .then(res => {
                dispatch(saveRequest(res.data));
                history.push("/patientDetails");
            });
    }

    function getNextWelfare() {
        axios.get(APIUrls.rest.getNextWelfare)
            .then(res => {
                dispatch(saveRequest(res.data));
                history.push("/patientDetails");
            });
    }

    return (
        <>
            <NextRequestButton color='yellow' size='huge' onClick={getNextPatient}>
                Next Request
            </NextRequestButton>
            <NextRequestButton color='teal' size='huge' onClick={getNextWelfare}>
                Next Welfare Check
            </NextRequestButton>
            <LogoBackdrop name="user doctor" size="massive"/>
        </>
    );
}

const NextRequestButton = styled(Button)`
    &.ui.button {
        margin-left: 5%;
    }
`;

const LogoBackdrop = styled(Icon)`
        transform: scale(6) translateX(6vw) translateY(8vh);
        color: #b0b0b0;
        position: fixed;
`;

export default LandingPage;
