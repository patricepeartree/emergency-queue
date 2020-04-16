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

    return (
        <div>
            <span>Calls in Queue: {stats?.callsOnQueue || "?"}</span>
        </div>
    );
}

export default StatsSection;