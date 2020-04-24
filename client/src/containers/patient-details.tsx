import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Segment } from "semantic-ui-react";

import { RootState } from "../store/store";
import Request from '../model/api/request'
import BrowserDialler from "./browser-dialler";
import CallNotes from "./call-notes";
import DetailsItem, { DetailsItemGroup } from "../components/details-item";

function PatientDetails() {
    const request: Request = useSelector((state: RootState) => state.appReducer.request);

    return (
        <FullHeightGrid columns={2} divided>
            <Grid.Row>
                <Grid.Column>
                    <DetailsItemGroup>
                        <DetailsItem
                            icon="user"
                            title="Patient Details"
                            content={[
                                request.patient.name,
                                request.patient.age
                            ]}
                        />
                        <DetailsItem
                            icon="clipboard outline"
                            title="Symptoms"
                            content={[
                                request.symptoms
                            ]}
                        />
                    </DetailsItemGroup>
                </Grid.Column>
                <Grid.Column>
                    <Segment basic>
                        <BrowserDialler />
                    </Segment>
                    <Segment>
                        <CallNotes />
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
