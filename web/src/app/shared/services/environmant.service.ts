import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable()
export class PokerEnvironmentService {

    // productionApiEndpoint = "https://poker.bigbasti.com:443/api";
    // developmentApiEndpoint = "http://localhost:8181/api";

    getApiEndpointRoot(): string {
        return this.determineBackendUrl();
    }

    /**
     * try to "guess" he backend api's url by looking at the current location
     */
    determineBackendUrl(): string {
        let port = 8181;
        let host = window.location.hostname;
        if (window.location.hostname === "localhost") {
            port = 8181;
        } else if (window.location.hostname === "web") {
            port = 8080;
            host = `api`;
        } else {
            port = 443;
        }
        return `${window.location.protocol}//${host}:${port}/api`;
    }

    isProduction(): boolean {
        return environment.production;
    }
}