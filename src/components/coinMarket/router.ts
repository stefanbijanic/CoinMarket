import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import CoinMarketController from "./controller";

class CoinMarketRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const coinMarketController = new CoinMarketController(resources);
        
        application.get("/", coinMarketController.getAll.bind(coinMarketController));
        application.get("/cryptocurrency/:coinSymbol", coinMarketController.getByCoinSymbol.bind(coinMarketController));
        application.get("/:coinName", coinMarketController.getByCoinName.bind(coinMarketController));
        application.get("/history/cryptocurrency/:coinName", coinMarketController.getByCoinNameAndDate.bind(coinMarketController));
    }
}

export default CoinMarketRouter;