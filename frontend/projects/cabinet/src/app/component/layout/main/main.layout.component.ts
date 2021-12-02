import {AfterViewInit, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MenuClassName} from "../../../service/menu.class.name";
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {IntegrationProvider} from "../../../../../../tools/src/lib/module/common/provider/integration.provider";
import {ToastrService} from "ngx-toastr";
import {DOCUMENT} from "@angular/common";

declare var $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './main.layout.component.html',
    styleUrls:[
        "../../../../assets/css/component-custom-switch.min.css",
        "../../../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
        "../../../../assets/css/perfect-scrollbar.css",
        "../../../../assets/css/dore.light.blue.css",
        "../../../../../../../node_modules/@ng-select/ng-select/themes/default.theme.css",
        "../../../../assets/css/main.css",
        "../../../../assets/css/custom.css",
    ],
    encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent implements AfterViewInit {
    subHiddenBreakpoint = 1440;
    searchHiddenBreakpoint = 768;
    menuHiddenBreakpoint = 768;
    allMenuClassNames = "menu-default menu-hidden sub-hidden main-hidden menu-sub-hidden main-show-temporary sub-show-temporary menu-mobile";

    constructor(
        private route: ActivatedRoute,
        private translate: TranslateService,
        private menuClassName: MenuClassName,
        private integrationProvider: IntegrationProvider,
        private toasterService: ToastrService,
        @Inject(DOCUMENT) private _document: Document,
    ) {
        this.acceptIntegration();
    }

    ngAfterViewInit() {
        const self = this;
        $(window).on("resize", function (event: any) {
            if (event.originalEvent.isTrusted) {
                self.onResize();
            }
        });
        this.onResize();
    }

    onResize() {
        const windowWidth = $(window).outerWidth();
        const container = $("#app-container");
        const mobClass = 'menu-mobile',
            defClass = 'menu-default',
            subClass = 'menu-sub-hidden'

        if (windowWidth < this.menuHiddenBreakpoint) {
            container.addClass(mobClass);
        } else if (windowWidth < this.subHiddenBreakpoint) {
            container.removeClass(mobClass);
            if (container.hasClass(defClass)) {
                container.removeClass(this.allMenuClassNames);
                container.addClass(defClass + " " + subClass);
            }
        } else {
            container.removeClass(mobClass);
            if (container.hasClass(defClass) && container.hasClass(subClass)) {
                container.removeClass(subClass);
            }
        }

        this.menuClassName.setMenuClassNames(0, true);
    }

    acceptIntegration() {
        this.route.queryParamMap.subscribe(test => {
            const token = test.get('token');

            if (token) {
                const pref = 'COMMON.ACTION.INTEGRATION.';
                this.translate.get([
                    pref + 'TITLE',
                    pref + 'BODY',
                    pref + 'CONFIRM',
                    pref + 'CANCEL',
                    pref + 'ERROR'
                ]).subscribe(mess => {
                    // @ts-ignore
                    Swal.fire({
                        icon: 'info',
                        title: mess[pref + 'TITLE'],
                        text: mess[pref + 'BODY'],
                        type: 'info',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonColor: '#dc3545',
                        confirmButtonText: mess[pref + 'CONFIRM'],
                        cancelButtonText: mess[pref + 'CANCEL']
                    }).then((test: any) => {
                        this.integrationProvider.confirm(token, test.isConfirmed).subscribe(data => {
                            if (data.hasOwnProperty('redirect_uri')) {
                                localStorage.removeItem('tokenIntegration');
                                // @ts-ignore
                                this._document?.location = data.redirect_uri;
                            } else {
                                this.toasterService.error(mess[pref + 'ERROR'], mess[pref + 'TITLE']);
                            }
                        });
                    });
                });
            }
        });
    }
}
