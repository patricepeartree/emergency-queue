const SERVER_URL = "http://localhost:8080"; // TODO this should come from an env
const NEXT_REQUEST = `${SERVER_URL}/api/internal/next`;

export default Object.freeze({
    // rest: {
    //   generatePdf: {
    //     metadata: `${SERVER_URL}/api/send/pages`,
    //     dataSources: `${SERVER_URL}/api/send/datasources`,
    //   },
    //   downloadPdf: `${SERVER_URL}/api/download/pdf`,
    // },
    socket: {
      endpoint: `${SERVER_URL}`, // socket has no custom path
      topic: {
        stats: 'stats',
      }
    },
    patient: {
        next: `${NEXT_REQUEST}`
    }
  });
