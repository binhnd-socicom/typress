/// <reference path="../typings/index.d.ts" />

import express = require("express");
import rootRouter = require("./routes/rootRouter");
import requestLogger = require("./middleware/requestLogger");
import Config from "./config/config";

export class App {
    /**
     * @param app - express application
     * @param port - port to listen on
     */

    constructor(private app: express.Express, private config: Config) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    /**
     * @param app - express application
     */

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