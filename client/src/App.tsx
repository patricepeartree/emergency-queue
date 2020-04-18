import React from 'react';
import {Sidebar, Segment, Header, Icon, Menu} from "semantic-ui-react";

import './App.css';
import 'semantic-ui-css/semantic.min.css'

import StatsSection from './containers/stats-section';

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

                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    );
}

export default App;
