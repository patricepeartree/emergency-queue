import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {Button, Dropdown, Grid, Segment} from "semantic-ui-react";

import { RootState } from "../store/store";
import Request from '../model/api/request'
import BrowserDialler from "./browser-dialler";
import CallNotes from "./call-notes";
import DetailsItem, { DetailsItemGroup } from "../components/details-item";
import { useHistory } from "react-router-dom";
import axios from "axios";
import APIUrls from "../constants/api-urls";
import { WelfareFrequency } from "../model/api/patient";
import { saveWelfareFrequency } from "../store/actions/actions";

function PatientDetails() {
    const request: Request = useSelector((state: RootState) => state.appReducer.request);
    const history = useHistory();
    const dispatch = useDispatch();

    const options = [
        { key: WelfareFrequency.DAILY, text: "Daily", value: WelfareFrequency.DAILY },
        { key: WelfareFrequency.EVERY_OTHER_DAY, text: "Every other day", value: WelfareFrequency.EVERY_OTHER_DAY },
        { key: WelfareFrequency.BI_WEEKLY, text: "Bi-weekly", value: WelfareFrequency.BI_WEEKLY },
        { key: WelfareFrequency.ONCE_A_WEEK, text: "Once a week", value: WelfareFrequency.ONCE_A_WEEK },
    ];

    const finishedPatient = {
        id: request._id,
        notes: useSelector((state: RootState) => state.appReducer.callNotes) || "",
        welfareFrequency: useSelector((state: RootState) => state.appReducer.welfareFrequency) || "",
    };

    function terminatePatient() {
        axios.post(APIUrls.rest.finishPatient, finishedPatient)
            .then(() => history.push("/landingPage"));
    }

    function updateWelfareFrequency(e: any, data: any) {
        dispatch(saveWelfareFrequency(data.value));
    }

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
                    <BottomSegment basic>
                        <Dropdown  placeholder='Welfare check frequency' fluid clearable options={options} selection onChange={updateWelfareFrequency}/>
                    </BottomSegment>
                </Grid.Column>
                <Grid.Column>
                    <Segment basic>
                        <BrowserDialler />
                    </Segment>
                    <Segment>
                        <CallNotes />
                    </Segment>
                    <BottomSegment basic>
                        <TerminateButton  size='huge' color='red' onClick={terminatePatient}>
                            Terminate
                        </TerminateButton>
                    </BottomSegment>
                </Grid.Column>
            </Grid.Row>
        </FullHeightGrid>
    );
}

const FullHeightGrid = styled(Grid)`
    height: 100%;
`;

const TerminateButton = styled(Button)`
    &.ui.button {
        margin: auto;
        display: flex;
    }

`;

const BottomSegment = styled(Segment)`
    &.ui.segment { 
        position: absolute;
        bottom: 0;
        padding-bottom: 0;
        right: 0;
        left: 0;
    }
`;

export default PatientDetails;
