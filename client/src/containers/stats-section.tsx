import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import SocketIO from 'socket.io-client';

import Stats from '../model/api/stats';
import APIUrls from '../constants/api-urls';

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
        <div>
            <div>Calls in Queue: {callsOnQueue}</div>
            <div>Calls in Process: {callsInProcess}</div>
            <div>Calls Processed Today: {callsProcessedToday}</div>
        </div>
    );
}

export default StatsSection;