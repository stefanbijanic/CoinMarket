import {Request, Response, NextFunction} from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IServices from "../../common/IServices.interface";

class CoinMarketController {
    private resources: IApplicationResources;

    constructor(resources: IApplicationResources) {
        this.resources = resources
    }

    protected get services(): IServices {
        return this.resources.services;
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const response = await this.services.coinMarketService.getAll();
        res.send(response);
    }

    public async getByCoinSymbol(req: Request, res: Response, next: NextFunction) {
        const coinSymbol: string = req.params.coinSymbol;

        const response = await this.services.coinMarketService.getByCoinSymbol(coinSymbol);
        res.send(response);
    }

    public async getByCoinName(req: Request, res: Response, next: NextFunction) {
        const coinName: string = req.params.coinName;

        const response = await this.services.coinMarketService.getByCoinName(coinName);
        res.send(response);
    }

    public async getByCoinNameAndDate(req: Request, res: Response, next: NextFunction) {
        const coinName: string = req.params.coinName;
        const date: string = req.body.date;

        const response = await this.services.coinMarketService.getByCoinNameAndDate(coinName, date);
        res.send(response);
    }
}

export default CoinMarketController;