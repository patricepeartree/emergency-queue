import React from 'react';
import {Route, Switch, BrowserRouter as Router, Redirect} from "react-router-dom";
import {Sidebar, Segment, Header, Icon, Menu} from "semantic-ui-react";
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
                <Sidebar.Pushable attached>
                    <Sidebar visible animation="push" width="wide">
                        <StatsSection/>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <MainContainer>
                            <Router>
                                <Switch>
                                    <Route path="/landingPage" component={LandingPage}/>
                                    <Route path="/patientDetails" component={PatientDetails}/>
                                    <Redirect from="/" exact to="/landingPage"/>
                                </Switch>
                            </Router>
                        </MainContainer>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </StretchedAppContent>
        </AppFlexLayout>
    );
}

const MainContainer = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   width: 100%;
   height: 100%;
   background-color: #bdbdbd;
`;

const AppFlexLayout = styled.div`
height: 100%;
display: flex;
flex-direction: column;
`;

const StretchedAppContent = styled.div`
flex-grow: 1;
`;


export default App;
