import {Component} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
// import Swal from 'sweetalert2';
import {TranslateService} from "@ngx-translate/core";
import {ConfigService} from "../../../../../tools/src/lib/module/common/service/config.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './proxy-outlet.component.html'
})
export class ProxyOutletComponent {

    landingPage = '';
    baseDomain = '';
    defaultLang = 'en';

    constructor(
        private route: ActivatedRoute,
        private translate: TranslateService,
        private cookieService: CookieService,
        private configService: ConfigService
    ) {

        this.defaultLang = this.translate.getDefaultLang();

        if (configService.config) {
            this.landingPage = configService.config.landingPage;
            this.baseDomain = configService.config.baseDomain;
        }

    }

}
