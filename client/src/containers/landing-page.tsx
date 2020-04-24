import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

import APIUrls from "../constants/api-urls";
import { saveRequest } from "../store/actions/actions";

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
            <Button style={{ marginLeft: 5 + '%' }} color='orange' size='huge' onClick={handleClick}>
                Next request
            </Button>
            <Icon name="user doctor" size="massive" style={{
                transform: "scale(6) translateX(8vw) translateY(8vh)",
                color: "#b0b0b0",
                position: "fixed"
            }} />
        </>
    );
}

export default LandingPage;
