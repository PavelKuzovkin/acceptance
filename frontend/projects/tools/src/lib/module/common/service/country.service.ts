import {Injectable} from "@angular/core";
import * as i18nIsoCountries from "i18n-iso-countries";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {BaseLanguageProvider} from "../provider/language.provider";

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    constructor(
        private translate: TranslateService,
        private langProvider: BaseLanguageProvider
    ) {
    }

    getList(): Observable<any[]> {
        return new Observable((observer) => {
            const lang = this.translate.getDefaultLang();
            const list: any[] = [];
            // @ts-ignore
            return this.langProvider.getDataCountry(lang).subscribe(dataCountry => {
                i18nIsoCountries.registerLocale(dataCountry);
                const countriesOrigin = i18nIsoCountries.getNames(lang);
                for (let countryCode of Object.keys(countriesOrigin)) {
                    list.push({id: countryCode, title: countriesOrigin[countryCode]});
                }

                observer.next(list);
            });
        });
    }
}
