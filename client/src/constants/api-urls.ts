const SERVER_URL = "http://localhost:8080"; // TODO this should come from an env

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
    }
  });
  