// const express = require("express");
import express from "express";
// const resHandler = require("./res-handler");
import resHandler from './res-handler.js';


const app = express();

app.get("/", resHandler);

app.listen(3000);
