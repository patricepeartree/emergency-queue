import React from "react";
import { useHistory } from "react-router-dom";



function PatientDetails() {
    let history = useHistory();

    function handleClick() {
        history.push("/landingPage");
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
