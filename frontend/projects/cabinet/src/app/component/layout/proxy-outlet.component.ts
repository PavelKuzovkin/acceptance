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

        // const value: string = this.cookieService.get('privacy-policy');
        // this.checkCookies(value);

        // if (value) {
        //     const isAgreed: string = this.cookieService.get('is_agreed_with_policies');
        //     this.acceptRules(isAgreed);
        // }

        // this.route.queryParamMap.subscribe(test => {
        //     const token = test.get('token');
        //     if (token) {
        //         localStorage.setItem('tokenIntegration', token);
        //     }
        // });
    }

    // acceptRules(isAgreed: string) {
    //     if(!isAgreed) {
    //         const pref = 'COMMON.ACTION.AGREEMENT.';
    //         this.translate.get([
    //             pref + 'SURE',
    //             pref + 'USERAGREEMENT',
    //             pref + 'TERMSANDCONDITIONS',
    //             pref + 'CONFIRM'
    //         ]).subscribe(mess => {
    //             Swal.fire({
    //                 icon: 'info',
    //                 allowOutsideClick: false,
    //                 html: this.getAgreementHtml(pref, mess),
    //                 focusConfirm: false,
    //                 confirmButtonColor: '#dc3545',
    //                 confirmButtonText: mess[pref + 'CONFIRM'],
    //                 customClass: {
    //                     confirmButton: 'agreement'
    //                 },
    //                 width: '40rem'
    //             }).then((isConfirmed: any) => {
    //                 if (isConfirmed.value) {
    //                     if (isConfirmed.value) {
    //                         this.cookieService.set('is_agreed_with_policies', 'true', {
    //                             domain: this.baseDomain,
    //                             expires: 365,
    //                             sameSite: "Lax"
    //                         });
    //                     }
    //                 }
    //             })
    //
    //             Swal.disableButtons();
    //         });
    //     }
    // }
    //
    // checkCookies(value: string) {
    //     if (!value) {
    //         const pref = 'COMMON.ACTION.COOKIES.';
    //         this.translate.get([
    //             pref + 'TITLE',
    //             pref + 'BODY',
    //             pref + 'MORE',
    //             pref + 'CONFIRM'
    //         ]).subscribe(mess => {
    //             // @ts-ignore
    //             Swal.fire({
    //                 icon: 'info',
    //                 title: mess[pref + 'TITLE'],
    //                 html: this.getCookiesHtml(pref, mess),
    //                 type: 'info',
    //                 allowOutsideClick: false,
    //                 focusConfirm: false,
    //                 confirmButtonColor: '#dc3545',
    //                 confirmButtonText: mess[pref + 'CONFIRM'],
    //             }).then((isConfirmed: any) => {
    //                 if (isConfirmed.value) {
    //                     if (isConfirmed.value) {
    //                         this.cookieService.set('privacy-policy', 'true',{
    //                             domain: this.baseDomain,
    //                             expires: 365,
    //                             sameSite: "Lax"
    //                         });
    //
    //                         const isAgreed: string = this.cookieService.get('is_agreed_with_policies');
    //                         this.acceptRules(isAgreed);
    //                     }
    //                 }
    //             });
    //         })
    //     }
    // }
    //
    // getAgreementHtml(pref: string,  mess: any) {
    //
    //     let html = ``;
    //
    //     let lang = 'en';
    //     if (this.defaultLang === 'ru') {
    //         lang = 'ru';
    //         html = `<div>
    //             <div class="custom-control custom-checkbox mb-2">
    //                 <input type="checkbox" class="custom-control-input" id="checkboxAgreeWithUserAgreement"
    //                 onchange="document.getElementById('checkboxAgreeWithUserAgreement')?.checked
    //                 && document.getElementById('checkboxAgreeWithTermsAndConditions')?.checked
    //                 ? document.getElementsByClassName('agreement')[0].removeAttribute('disabled')
    //                 : document.getElementsByClassName('agreement')[0].setAttribute('disabled', 'disabled')">
    //                 <label class="custom-control-label" for="checkboxAgreeWithUserAgreement">
    //                     ` + mess[pref + 'SURE'] + ` <a style="color: #007bff" href="` + this.landingPage + `/` + lang + `/user-agreement">` + mess[pref + 'USERAGREEMENT'] + `</a>
    //                 </label>
    //             </div>
    //             <div class="custom-control custom-checkbox mb-2">
    //                 <input type="checkbox" class="custom-control-input" id="checkboxAgreeWithTermsAndConditions"
    //                 onchange="document.getElementById('checkboxAgreeWithUserAgreement')?.checked
    //                 && document.getElementById('checkboxAgreeWithTermsAndConditions')?.checked
    //                 ? document.getElementsByClassName('agreement')[0].removeAttribute('disabled')
    //                 : document.getElementsByClassName('agreement')[0].setAttribute('disabled', 'disabled')">
    //                 <label class="custom-control-label" for="checkboxAgreeWithTermsAndConditions">
    //                     ` + mess[pref + 'SURE'] + ` <a style="color: #007bff" href="` + this.landingPage + `/` + lang + `/terms-and-conditions">` + mess[pref + 'TERMSANDCONDITIONS'] + `</a>
    //                 </label>
    //             </div>
    //         </div>`;
    //     } else {
    //         html = `<div>
    //             <div class="custom-control custom-checkbox mb-2">
    //                 <input type="checkbox" class="custom-control-input" id="checkboxAgreeWithTermsAndConditions"
    //                 onchange="document.getElementById('checkboxAgreeWithTermsAndConditions')?.checked
    //                 ? document.getElementsByClassName('agreement')[0].removeAttribute('disabled')
    //                 : document.getElementsByClassName('agreement')[0].setAttribute('disabled', 'disabled')">
    //                 <label class="custom-control-label" for="checkboxAgreeWithTermsAndConditions">
    //                     ` + mess[pref + 'SURE'] + ` <a style="color: #007bff" href="` + this.landingPage + `/` + lang + `/terms-and-conditions">` + mess[pref + 'TERMSANDCONDITIONS'] + `</a>
    //                 </label>
    //             </div>
    //         </div>`;
    //     }
    //
    //     return html;
    // }

    // getCookiesHtml(pref: string,  mess: any) {
    //     let lang = 'en';
    //     if (this.defaultLang === 'ru')
    //         lang = 'ru';
    //
    //     return mess[pref + 'BODY'] + '<br/> ' +
    //     '<a target="_blank" class="text-more" href="' + this.landingPage + '/' + lang + '/privacy-policy">' + mess[pref + 'MORE'] + '</a>';
    // }
}
