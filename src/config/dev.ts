import IConfig from "../common/IConfig.interface";
import * as dotenv from "dotenv"

const dotEnvResult = dotenv.config();

if (dotEnvResult.error) {
    throw "Environment configuration file error" + dotEnvResult.error;
}

const Config: IConfig = {
    server: {
        port: +(process.env?.SERVER_PORT),
        static: {
            route: "/static",
            path: "./static/",
            cacheControl: false,
            dotfiles: "deny",
            etag: false,
            index: false,
            maxAge: 360000,
        }
    }
}

export default Config;