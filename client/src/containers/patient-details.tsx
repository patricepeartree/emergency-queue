import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// https://react.semantic-ui.com/views/card/#content-extra-contentd

function PatientDetails() {
    let history = useHistory();
    const request = useSelector((state: RootState) => state.appReducer.request);

    function handleClick() {
        console.log(request);
        //history.push("/landingPage");
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


export default PatientDetails;
