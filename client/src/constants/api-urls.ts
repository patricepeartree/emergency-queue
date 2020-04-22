const SERVER_URL = "http://localhost:8080"; // TODO this should come from an env

export default Object.freeze({
    rest: {
        getNextPatient: `${SERVER_URL}/api/internal/next`,
        callPatient: {
            token: `${SERVER_URL}/api/internal/call/token`
        }
    },
    socket: {
        endpoint: `${SERVER_URL}`, // socket has no custom path
        topic: {
            stats: 'stats',
        }
    }
});
