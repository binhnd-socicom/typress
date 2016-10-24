/// <reference path="../typings/index.d.ts" />

import express = require("express");
import rootRouter = require("./routes/rootRouter");
import requestLogger = require("./middleware/requestLogger");
import Config from "./config/config";
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

export class App {
    /**
     * @param app - express application
     * @param port - port to listen on
     */

    constructor(private app: express.Express, private config: Config) {
        this.configureApp(app);
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    /**
     * @param app - express application
     */
    private configureApp(app: express.Express) {
        // view engine setup
        app.set("views", path.join(this.config.root, "views"));
        app.set("view engine", "ejs");

        // bodyParser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // cookieParser
        app.use(cookieParser());
    }

    private configureMiddleware(app: express.Express) {
        app.use(requestLogger);
    }

    private configureRoutes(app: express.Express) {
        app.use("/", rootRouter);
    }

    public run() {
        this.app.listen(this.config.port);
    }
}