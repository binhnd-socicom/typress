import express = require("express");

let rootRouter = express.Router();

rootRouter.get("/", (req: express.Request, res: express.Response) => {
    let testData = {
        code: 0,
        message: "Hello Typress Developer"
    };

    res.send(testData);
});

export = rootRouter;