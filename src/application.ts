/// <reference path="../typings/index.d.ts" />

import express = require("express");
import rootRouter = require("./routes/rootRouter");
import requestLogger = require("./middleware/requestLogger");

export class WebApi {
    /**
     * @param app - express application
     * @param port - port to listen on
     */

    constructor(private app: express.Express, private port: number) {
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
        this.app.listen(this.port);
    }
}