import express from "express";
import bodyParser from "body-parser";

import todosRouter from "./routes/todo";

const app = express();

app.use(bodyParser.json());

app.use(todosRouter);

app.listen(3000);
