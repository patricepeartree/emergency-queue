import React from "react";
import { useHistory } from "react-router-dom";
import {Button} from "semantic-ui-react";
import styled from "styled-components";



function LandingPage() {
    let history = useHistory();

    function handleClick() {
        history.push("/patientDetails");
    }

    return (
            <Button style={{marginLeft: 5 + '%', marginTop: 5 + '%'}} color='orange' size='huge' onClick={handleClick}>
                Call patient
            </Button>
    );
}

export default LandingPage;
