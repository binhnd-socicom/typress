import express = require("express");
import { WebApi } from "./application";

let port = 3000;
let api = new WebApi(express(), port);

api.run();

console.info(`listening on ${port}`);