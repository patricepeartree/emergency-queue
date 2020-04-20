import React from "react";
import { useHistory } from "react-router-dom";
import {Button, Icon} from "semantic-ui-react";
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
        <div>
            <Button style={{marginLeft: 5 + '%'}} color='orange' size='huge' onClick={handleClick}>
                Next request
            </Button>
                <Icon name="user doctor" size="massive" style={{transform: 'scale('+5+')'
                    + 'translateX('+9+'vw) translateY('+11+'vh)', color: '#b0b0b0'}}/>
        </div>
    );
}

export default LandingPage;
