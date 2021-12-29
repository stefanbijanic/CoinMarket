import * as express from "express";
import Config from "./config/dev";
import IApplicationResources from "./common/IApplicationResources.interface";
import Router from "./router";
import CoinMarketService from "./components/coinMarket/service";
import CoinMarketRouter from "./components/coinMarket/router";

const application: express.Application = express();

application.use(express.json());

const resources: IApplicationResources = {}

resources.services = {
    coinMarketService: new CoinMarketService(),
}

Router.setupRoutes(application, resources, [
    new CoinMarketRouter(),
]);

application.use(
    Config.server.static.route,
    express.static(Config.server.static.path, {
        index: Config.server.static.index,
        cacheControl: Config.server.static.cacheControl,
        maxAge: Config.server.static.maxAge,
        etag: Config.server.static.etag,
        dotfiles: Config.server.static.dotfiles
    })
);

application.use((req, res) => {
    res.sendStatus(404);
});

application.use((err, req, res, next) => {
    res.status(err.status).send(err.type);
});

application.listen(Config.server.port);