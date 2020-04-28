import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";

import APIUrls from "../constants/api-urls";
import { saveRequest } from "../store/actions/actions";
import styled from "styled-components";

function LandingPage() {
    const dispatch = useDispatch();

    const history = useHistory();

    function handleClick() {
        axios.get(APIUrls.rest.getNextPatient)
            .then(res => {
                dispatch(saveRequest(res.data));
                history.push("/patientDetails");
            });
    }

    // TODO styled-components
    return (
        <>
            <NextRequestButton color='orange' size='huge' onClick={handleClick}>
                Next request
            </NextRequestButton>
            <Icon name="user doctor" size="massive" style={{
                transform: "scale(6) translateX(8vw) translateY(8vh)",
                color: "rgba(0, 0, 0, 0.1)",
                position: "fixed"
            }} />
        </>
    );
}

const NextRequestButton = styled(Button)`
    &.ui.button {
        margin-left: 5%;
    }

`;

export default LandingPage;
