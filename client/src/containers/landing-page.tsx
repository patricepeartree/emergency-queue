import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {Button, Icon, Modal} from "semantic-ui-react";
import axios from "axios";

import APIUrls from "../constants/api-urls";
import HttpStatus from "../constants/http-status-codes";
import {changeModalMessage, resetPatient, saveRequest, toggleModal} from "../store/actions/actions";
import styled from "styled-components";
import {RootState} from "../store/store";

import throwConfetti from "../utils/throw-confetti";


function LandingPage() {
    const dispatch = useDispatch();

    const history = useHistory();
    const modalState: boolean = useSelector((state: RootState) => state.appReducer.modalOpen);
    const modalMessage: string = useSelector((state: RootState) => state.appReducer.modalMessage);


    useEffect(() => {
        dispatch(resetPatient());
    });



    function getNextPatient() {
        axios.get(APIUrls.rest.getNextPatient)
            .then(res => {
                if (res.status === HttpStatus.success.ok) {
                    dispatch(saveRequest(res.data));
                    history.push("/patientDetails");
                } else if (res.status === HttpStatus.success.noContent) {
                    dispatch(changeModalMessage('No more requests to process!'));
                    throwConfetti();
                }
            }).catch(res => {
                if (res.status === HttpStatus.error.server) {
                    alert('Internal Server Error!');
                }
        });
    }

    function getNextWelfare() {
        axios.get(APIUrls.rest.getNextWelfare)
            .then(res => {
                if (res.status === HttpStatus.success.ok) {
                    dispatch(saveRequest(res.data));
                    history.push("/patientDetails");
                } else if (res.status === HttpStatus.success.noContent) {
                    dispatch(changeModalMessage('No more welfare checks to process!'));
                    throwConfetti();
                }
            }).catch(res => {
            if (res.status === HttpStatus.error.server) {
                alert('Internal Server Error!');
            }
        });
    }


    function handleClose() {
        console.log('start close');
        dispatch(toggleModal(false));
        console.log('finish close');
    }

    return (
        <>
            <NextRequestButton color='yellow' size='huge' onClick={getNextPatient}>
                Next Request
            </NextRequestButton>
            <NextRequestButton color='teal' size='huge' onClick={getNextWelfare}>
                Next Welfare Check
            </NextRequestButton>
            <LogoBackdrop name="user doctor" size="massive"/>
            <Modal dimmer="inverted" size="tiny" open={modalState} onClose={handleClose}>
                    <ModalHeader >
                            {modalMessage}
                    </ModalHeader>
            </Modal>
        </>
    );
}

const NextRequestButton = styled(Button)`
    &.ui.button {
        margin-left: 5%;
    }
`;

const LogoBackdrop = styled(Icon)`
        transform: scale(6)  translateX(1em) translateY(0.7em);
        color: rgba(176, 176, 176, 0.4);
        position: absolute;
`;

const ModalHeader = styled(Modal.Description)`
    font-size: 1.42857143rem;
    font-weight: 700;
    text-align: center;
    padding: 4rem;
`;


export default LandingPage;
