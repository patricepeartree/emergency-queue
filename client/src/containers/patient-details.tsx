import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Button, Card, Icon} from "semantic-ui-react";
import Request from '../model/api/request'
import styled from "styled-components";


// https://react.semantic-ui.com/views/card/#content-extra-contentd

function PatientDetails() {
    let history = useHistory();
    const request: Request = useSelector((state: RootState) => state.appReducer.request);


    function handleClick() {
        console.log(request);
        //history.push("/landingPage");
    }

    return (
        <Container>
            <Card.Group centered>
                <Card raised>
                    <Card.Content style={{backgroundColor: '#e6e6e6'}}  textAlign="center">
                        <Icon name="user" size="huge"/>
                    </Card.Content>
                    <Card.Content>
                        <Card.Header>Details</Card.Header>
                        <Card.Description>{request.patient.name}</Card.Description>
                        <Card.Description>{request.patient.age}</Card.Description>
                    </Card.Content>
                </Card>
                <Card raised>
                    <Card.Content style={{backgroundColor: '#e6e6e6'}}  textAlign="center">
                        <Icon name="clipboard outline" size="huge"/>
                    </Card.Content>
                    <Card.Content>
                        <Card.Header>Symptoms</Card.Header>
                        <Card.Description>{request.symptoms}</Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
            <Button style={{ bottom:0, right:0, position: 'absolute'}} color='orange' size='huge' onClick={handleClick}>
                Call patient
            </Button>
        </Container>
    );
}


const Container = styled.div`
    width: fit-content;
    margin: auto;
    height: 100%;
    position: relative;`
;

export default PatientDetails;
