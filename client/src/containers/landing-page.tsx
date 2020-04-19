import React from "react";
import { useHistory } from "react-router-dom";



function LandingPage() {
    let history = useHistory();

    function handleClick() {
        history.push("/patientDetails");
    }

    return (
        <div>
            <p>LANDING PAGE?!</p>
            <button type="button" onClick={handleClick}>
                Call patient
            </button>
        </div>
    );
}

export default LandingPage;
