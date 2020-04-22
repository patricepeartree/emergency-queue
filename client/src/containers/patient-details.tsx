import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Card, Icon, Grid } from "semantic-ui-react";

import { RootState } from "../store/store";
import Request from '../model/api/request'
import BrowserDialler from "./browser-dialler";

// https://react.semantic-ui.com/views/card/#content-extra-contentd

function PatientDetails() {
    const request: Request = useSelector((state: RootState) => state.appReducer.request);

    return (
        <FullHeightGrid divided="vertically">
            <Grid.Row columns={1}>
                <Grid.Column>
                    <Card.Group centered>
                        <Card raised>
                            <Card.Content style={{ backgroundColor: '#e6e6e6' }} textAlign="center">
                                <Icon name="user" size="huge" />
                            </Card.Content>
                            <Card.Content>
                                <Card.Header>Details</Card.Header>
                                <Card.Description>{request.patient.name}</Card.Description>
                                <Card.Description>{request.patient.age}</Card.Description>
                            </Card.Content>
                        </Card>
                        <Card raised>
                            <Card.Content style={{ backgroundColor: '#e6e6e6' }} textAlign="center">
                                <Icon name="clipboard outline" size="huge" />
                            </Card.Content>
                            <Card.Content>
                                <Card.Header>Symptoms</Card.Header>
                                <Card.Description>{request.symptoms}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <BrowserDialler />
                </Grid.Column>
                <Grid.Column>TODO</Grid.Column>
            </Grid.Row>
        </FullHeightGrid>
    );
}

const FullHeightGrid = styled(Grid)`
    height: 100%;
`;

// const Container = styled.div`
//     width: fit-content;
//     margin: auto;
//     height: 100%;
//     position: relative;
// `;

export default PatientDetails;
