import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();
const port = 3080;

  app.use(cors({
      origin: "http://localhost:3000",
  }));

app.use("/api", routes);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
