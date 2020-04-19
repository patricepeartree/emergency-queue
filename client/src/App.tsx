import React from 'react';
import { Sidebar, Segment, Header, Icon, Menu, Grid } from "semantic-ui-react";
import styled from "styled-components";

import './App.css';
import 'semantic-ui-css/semantic.min.css'

import StatsSection from './containers/stats-section';

function App() {
    return (
        <AppFlexLayout>
            <Menu attached>
                <Menu.Item className="borderless" header as="h2" name="user doctor">
                    <Icon name="user doctor" />
                    <Header.Content>Emergency Queue</Header.Content>
                </Menu.Item>
                <Menu.Item position="right" name="EXIT" />
            </Menu>
            <StretchedAppContent>
                <Sidebar.Pushable attached as={Segment}>
                    <Sidebar visible animation="push" width="wide">
                        <StatsSection />
                    </Sidebar>
                    <Sidebar.Pusher>
                        TODO
                </Sidebar.Pusher>
                </Sidebar.Pushable>
            </StretchedAppContent>
        </AppFlexLayout>
    );
}

const AppFlexLayout = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const StretchedAppContent = styled.div`
    flex-grow: 1;
`;

export default App;
