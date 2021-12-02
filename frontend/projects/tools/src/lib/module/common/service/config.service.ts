import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Config {
    baseDomain: string;
    baseUrl: string,
    authUrl: string,
    loginPage: string,
    landingPage: string;
    production: boolean,
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    config: Config | undefined;

    constructor(private http: HttpClient) {}

    loadConfig() {
        return this.http
            .get<Config>("/assets/config-stage.json")
            .toPromise()
            .then(config => {
                console.log("Config loaded:", JSON.stringify(config));
                this.config = config;
            });
    }
}
