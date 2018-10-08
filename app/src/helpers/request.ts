import * as baseRequest from "request-promise-native";
import { logger } from '../config';

export default class Request {
    static get(url: string){
        logger.debug(`Start request (${url})`);
        return baseRequest.get(url)
            .then((data) => {
                logger.debug(`Success request (${url})`);

                return data;
            })
            .catch((e) => {
                logger.exceptions.handle(e);
            });
    };
}