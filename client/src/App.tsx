import React from 'react';
import { Sidebar, Segment, Header, Icon } from "semantic-ui-react";

import './App.css';
import 'semantic-ui-css/semantic.min.css'

import StatsSection from './containers/stats-section';

function App() {
    return (
        <>
            <Header as="h2">
                <Icon name='user doctor' />
                <Header.Content>Emergency Queue</Header.Content>
            </Header>

            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    animation="push"
                    visible
                    width="wide"
                >
                    <StatsSection />
                </Sidebar>

                <Sidebar.Pusher>
                    <div style={{ height: "100vh" }}>
                        TODO
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    );
}

export default App;
