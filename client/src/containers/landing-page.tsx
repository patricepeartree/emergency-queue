import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
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

    return (
        <Button style={{ marginLeft: 5 + '%', marginTop: 5 + '%' }} color='orange' size='huge' onClick={handleClick}>
            Call patient
        </Button>
    );
}

export default LandingPage;
