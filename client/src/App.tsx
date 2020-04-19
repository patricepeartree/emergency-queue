import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import {Sidebar, Segment, Header, Icon, Menu} from "semantic-ui-react";


import './App.css';
import 'semantic-ui-css/semantic.min.css'

import StatsSection from './containers/stats-section';
import PatientDetails from "./containers/patient-details";
import LandingPage from "./containers/landing-page";

function App() {

    return (
        <>
            <Menu attached>
                <Menu.Item className='borderless' header as="h2" name='user doctor'>
                        <Icon name='user doctor' />
                        <Header.Content>Emergency Queue</Header.Content>
                </Menu.Item>
                <Menu.Item
                    position='right'
                    name='EXIT'
                />
            </Menu>
            <Sidebar.Pushable attached as={Segment}>
                <Sidebar
                    animation="push"
                    visible
                    width="wide"
                >

                    <StatsSection />
                </Sidebar>
                <Sidebar.Pusher>
                    <div style={{ height: "100vh" }}>
                        <Router>
                            <Switch>
                                <Route path="/landingPage" component={LandingPage} />
                                <Route path="/patientDetails" component={PatientDetails} />

                                <Redirect from="/" exact to="/landingPage" />

                            </Switch>
                        </Router>

                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    );
}

export default App;
