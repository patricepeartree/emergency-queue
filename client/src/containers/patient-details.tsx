import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Card, Icon, Grid, Segment } from "semantic-ui-react";

import { RootState } from "../store/store";
import Request from '../model/api/request'
import BrowserDialler from "./browser-dialler";


function PatientDetails() {
    const request: Request = useSelector((state: RootState) => state.appReducer.request);

    return (
        <FullHeightGrid columns={2} divided>
            <Grid.Row>
                <Grid.Column>
                    <Card.Group>
                        <Card fluid>
                            <Card.Content style={{ backgroundColor: '#e6e6e6' }} textAlign="center">
                                <Icon name="user" size="huge" />
                            </Card.Content>
                            <Card.Content>
                                <Card.Header>Details</Card.Header>
                                <Card.Description>{request.patient.name}</Card.Description>
                                <Card.Description>{request.patient.age}</Card.Description>
                            </Card.Content>
                        </Card>
                        <Card fluid>
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
                <Grid.Column>
                    <Segment basic>
                        <BrowserDialler />
                    </Segment>
                    <Segment>
                        TODO
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </FullHeightGrid>
    );
}

const FullHeightGrid = styled(Grid)`
    height: 100%;
`;

export default PatientDetails;
