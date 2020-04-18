import React, { useEffect, useState } from 'react';
import SocketIO from 'socket.io-client';

import Stats from '../model/api/stats';
import APIUrls from '../constants/api-urls';
import { Statistic } from 'semantic-ui-react';

function StatsSection() {
    const [stats, setStats] = useState<Stats>();

    useEffect(() => {
        const socket = SocketIO(APIUrls.socket.endpoint);

        socket.on(APIUrls.socket.topic.stats, (newStats: Stats) => {
            setStats(newStats);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const callsOnQueue = stats?.callsOnQueue != null ? stats.callsOnQueue : "?";
    const callsInProcess = stats?.callsInProcess != null ? stats.callsInProcess : "?";
    const callsProcessedToday = stats?.callsProcessedToday != null ? stats.callsProcessedToday : "?";

    return (
        <div style={{textAlign: "center"}}>
            <div>
                <Statistic color="yellow">
                    <Statistic.Value>{callsOnQueue}</Statistic.Value>
                    <Statistic.Label>Calls in Queue</Statistic.Label>
                </Statistic>
            </div>
            <div>
                <Statistic color="teal">
                    <Statistic.Value>{callsInProcess}</Statistic.Value>
                    <Statistic.Label>Calls in Process</Statistic.Label>
                </Statistic>
            </div>
            <div>
                <Statistic color="green">
                    <Statistic.Value>{callsProcessedToday}</Statistic.Value>
                    <Statistic.Label>Calls Processed Today</Statistic.Label>
                </Statistic>
            </div>
        </div>
    );
}

export default StatsSection;