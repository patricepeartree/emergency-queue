import React from 'react';
import {Route, Switch, MemoryRouter as Router, Redirect} from "react-router-dom";
import { Header, Icon, Menu} from "semantic-ui-react";
import styled from "styled-components";

import './App.css';
import 'semantic-ui-css/semantic.min.css'

import StatsSection from './containers/stats-section';
import PatientDetails from "./containers/patient-details";
import LandingPage from "./containers/landing-page";

function App() {

    return (
        <AppFlexLayout>
            <Menu attached>
                <Menu.Item className="borderless" header as="h2" name="user doctor">
                    <Icon name="user doctor"/>
                    <Header.Content>Emergency Queue</Header.Content>
                </Menu.Item>
                <Menu.Item position="right" name="EXIT"/>
            </Menu>
            <StretchedAppContent>
                <SideContainer>
                    <StatsSection/>
                </SideContainer>
                        <MainContainer>
                            <Router>
                                <Switch>
                                    <Route path="/landingPage" component={LandingPage}/>
                                    <Route path="/patientDetails" component={PatientDetails}/>
                                    <Redirect from="/" exact to="/landingPage"/>
                                </Switch>
                            </Router>
                        </MainContainer>
            </StretchedAppContent>
        </AppFlexLayout>
    );
}

const MainContainer = styled.div`
   background-color: #bdbdbd;
   padding: 5%;
   flex-grow:1;
`;

const AppFlexLayout = styled.div`
height: 100%;
display: flex;
flex-direction: column;
`;

const StretchedAppContent = styled.div`
flex-grow: 1;
display: flex;
`;

const SideContainer = styled.div`
margin: 3vw;
`;


export default App;
