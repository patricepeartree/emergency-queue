import React, { useEffect, useState } from 'react';
import SocketIO from 'socket.io-client';

import Stats from '../model/api/stats';
import APIUrls from '../constants/api-urls';
import Statistic from "../components/statistic";

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
        <>
            <Statistic label="Calls in Queue" value={callsOnQueue} icon="clock outline" color="yellow" />
            <Statistic label="Calls in Process" value={callsInProcess} icon="call" color="teal" />
            <Statistic label="Calls Processed Today" value={callsProcessedToday} icon="check" color="green" />
        </>
    );
}

export default StatsSection;
