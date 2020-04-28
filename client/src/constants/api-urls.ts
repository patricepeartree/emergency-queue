const SERVER_URL = "http://localhost:8080"; // FIXME env variable

export default Object.freeze({
    rest: {
        getNextPatient: `${SERVER_URL}/api/internal/patient/next`,
        callPatient: {
            token: `${SERVER_URL}/api/internal/call/token`
        },
        finishPatient:`${SERVER_URL}/api/internal/patient/finish`,
        getNextWelfare: `${SERVER_URL}/api/internal/patient/next/w`
    },
    socket: {
        endpoint: `${SERVER_URL}`, // socket has no custom path
        topic: {
            stats: 'stats',
        }
    }
});
