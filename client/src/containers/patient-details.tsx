import React from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import APIUrls from "../constants/api-urls";
import {saveRequest} from "../store/actions/actions";
import Request from '../model/api/request'
import {connect} from "react-redux";


// https://react.semantic-ui.com/views/card/#content-extra-contentd

function PatientDetails() {
    let history = useHistory();

    function handleClick() {
        axios.get(APIUrls.patient.next)
            .then(res => {
                saveRequest(res.data);
                history.push("/landingPage");
            });
    }

    return (
        <div>
            <p>PATIENT DETAILS?!</p>
            <button type="button" onClick={handleClick}>
                Go back
            </button>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    saveRequest: (request: Request) => dispatch(saveRequest(request))
});


export default connect(mapDispatchToProps)(PatientDetails);
