import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();
const port = 8080; // put this in an env variable

  app.use(cors({
      origin: "http://localhost:3000",
  }));

app.use("/api", routes);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log("hello");
  return console.log(`server is listening on ${port}`);
});
