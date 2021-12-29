import * as dotenv from "dotenv";
import axios from "axios";
import IErrorResponse from "../../common/IErrorResponse.interface";
import CoinMarketModel from "./model";

const dotEnvResult = dotenv.config();

const coinMarketCapUrl = process.env?.COIN_MARKET_CAP_URL;
const coinMarketCapAPI = process.env?.COIN_MARKET_CAP_API;
const coinGeckoUrl = process.env.COIN_GECKO_URL;

class CoinMarketService {
    public async getAll(): Promise<CoinMarketModel[]|IErrorResponse> {
        let allCoins = [];

        try {
            let coinData = [];
            const res = await axios.get(coinMarketCapUrl + "v1/cryptocurrency/listings/latest", {
                method: "get",
                headers: {
                    'X-CMC_PRO_API_KEY': coinMarketCapAPI
                },                
            });
            
            for (let [_, coin] of Object.entries(res.data.data)) {
                coinData.push(coin);
            }

            for (let coin of coinData) {
                let coinModel = new CoinMarketModel();

                coinModel.name = coin?.name;
                coinModel.symbol = coin?.symbol;
                coinModel.priceUSD = +(coin?.quote.USD.price);
                coinModel.lastUpdated = coin?.last_updated;
                coinModel.maxSupply = +(coin?.max_supply);
                coinModel.dateAdded = coin?.date_added;
                
                allCoins.push(coinModel);
            }
        } catch (error) {
            return({
                errorCode: 1001,
                errorMessage: "API connection failed",
            })
        }


        return allCoins;
    }

    public async getByCoinSymbol(coinSymbol: string): Promise<CoinMarketModel|IErrorResponse> {
        let coinModel = new CoinMarketModel();

        try {
            let coinData;
            const res = await axios.get(coinMarketCapUrl + "v1/cryptocurrency/quotes/latest", {
                method: "get",
                headers: {
                    'X-CMC_PRO_API_KEY': coinMarketCapAPI
                },
                params: {
                    symbol: coinSymbol,
                }
            });
            
            for (let [_, coin] of Object.entries(res.data.data)) {
                coinData = coin;
            }

            coinModel.name = coinData?.name;
            coinModel.symbol = coinData?.symbol;
            coinModel.priceUSD = +(coinData?.quote.USD.price);
            coinModel.lastUpdated = coinData?.last_updated;
            coinModel.maxSupply = +(coinData?.max_supply);
            coinModel.dateAdded = coinData?.date_added;
            
        } catch (error) {
            return({
                errorCode: 1002,
                errorMessage: "Non existing coin symbol",
            })
        }

        return coinModel;
    }

    public async getByCoinName(coinName: string): Promise<CoinMarketModel|IErrorResponse> {
        let coinModel = new CoinMarketModel();

        try {
            const res = await axios.get(coinGeckoUrl + coinName, {});

            coinModel.name = res.data.name;
            coinModel.symbol = res.data.symbol;
            coinModel.priceUSD = +(res.data.market_data.current_price.usd);
            coinModel.lastUpdated = res.data.last_updated;
            coinModel.maxSupply = +(res.data.market_data.max_supply);
            coinModel.dateAdded = res.data.genesis_date;
            
        } catch (error) {
            return({
                errorCode: 3,
                errorMessage: "Non existing coin name",
            })
        }


        return coinModel;
    }

    public async getByCoinNameAndDate(coinName: string, date: string): Promise<CoinMarketModel|IErrorResponse> {
        let coinModel = new CoinMarketModel()
        try {
            const res = await axios.get(coinGeckoUrl + coinName + "/history?date=" + date, {});

            coinModel.name = res.data.name;
            coinModel.symbol = res.data.symbol;
            coinModel.priceUSD = +(res.data.market_data.current_price.usd);
            
        } catch (error) {
            return({
                errorCode: 4,
                errorMessage: "Non existing coin name or invalid date",
            })
        }


        return coinModel;
    }
}

export default CoinMarketService;