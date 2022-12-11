import * as express from "express";
import {pingController} from "./controllers/ping";

const app = express();

const cors = require('cors');

app.use(cors());
app.use(pingController);


export default app;
