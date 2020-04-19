import React from "react";
import { useHistory } from "react-router-dom";
import {Button} from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";
import APIUrls from "../constants/api-urls";
import {saveRequest} from "../store/actions/actions";
import Request from "../model/api/request";
import {connect, useDispatch} from "react-redux";



function LandingPage() {
    const dispatch = useDispatch();


    let history = useHistory();

    function handleClick() {
        axios.get(APIUrls.patient.next)
            .then(res => {
                dispatch(saveRequest(res.data));
                history.push("/patientDetails");
            });

    }

    return (
            <Button style={{marginLeft: 5 + '%', marginTop: 5 + '%'}} color='orange' size='huge' onClick={handleClick}>
                Call patient
            </Button>
    );
}

export default LandingPage;
