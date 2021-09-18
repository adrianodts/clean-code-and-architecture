import Hapi from "@hapi/hapi"
import Http from "./Http";

export default class HapiHttp implements Http {

    server: any;

    constructor() {
        this.server = Hapi.server({
            port: 3000
        });
    }

    convertUrl (url: string) : string {
        return url.replace(/\$/g, "");
    }

    async on(method: string, url: string, fn: any): Promise<void> {
        this.server.route({
            method,  
            path: this.convertUrl(url),
            handler: (request: any, h: any) => {
                const data = fn(request.params, request.payload);
                return data;
            }
        }); 
    }

    async listen(port: number): Promise<void> {
        await this.server.start();
    }
    
}