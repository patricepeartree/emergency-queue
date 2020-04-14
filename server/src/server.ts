import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as ngrok from 'ngrok';

import routes from './routes';

const port = 8080; // TODO put this in an env variable

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors({
//   origin: "http://localhost:3000",
// }));
app.use(cors());

app.use("/api", routes);

// (async function() {
//   console.log("Starting ngrok...");
//   const url = await ngrok.connect(port);

  app.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    return console.log("Go ahead for server!");
  });
// })();
