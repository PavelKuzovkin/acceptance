import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgProgressModule} from "ngx-progressbar";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routing";
import {ProxyOutletComponent} from "./component/layout/proxy-outlet.component";
import {NgxPermissionsModule} from "ngx-permissions";
import {ToastrModule} from "ngx-toastr";
import {FullscreenService} from "./service/fullscreen.service";
import {AuthGuard} from "../../../tools/src/lib/module/common/service/auth.guard.service";
import {BreadcrumbsService} from "../../../tools/src/lib/module/common/service/breadcrumbs.service";
import {PagerComponent} from "../../../tools/src/lib/module/common/component/view/_pager.component";
import {MyCommonModule} from "../../../tools/src/lib/module/common/common.module";
import {MainLayoutComponent} from "./component/layout/main/main.layout.component";
import {TopNavbarComponent} from "./component/layout/main/_top.navbar.component";
import {MenuComponent} from "./component/layout/main/_menu.component";
import {BreadcrumbsComponent} from "./component/layout/main/_breadcrumbs.component";
import {AuthLayoutComponent} from "./component/layout/auth/auth.layout.component";
import {ProfileComponent} from "./component/layout/main/profile.component";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {MenuClassName} from "./service/menu.class.name";
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {IonicModule} from '@ionic/angular';
import {NgSelectModule} from '@ng-select/ng-select';
import {CookieService} from 'ngx-cookie-service';
import {ConfigService} from "../../../tools/src/lib/module/common/service/config.service";

export const configFactory = (configService: ConfigService) => {
    return () => configService.loadConfig();
};

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=0.3');
}

@NgModule({
    declarations: [
        ProxyOutletComponent,
        MainLayoutComponent,
        TopNavbarComponent,
        MenuComponent,
        BreadcrumbsComponent,
        AuthLayoutComponent,
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgProgressModule,
        PerfectScrollbarModule,
        RouterModule.forRoot(AppRoutes),
        NgxPermissionsModule.forRoot(),
        ToastrModule.forRoot({
            closeButton: true,
            tapToDismiss: false,
            timeOut: 3000
        }),
        MyCommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        }),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        CollapseModule.forRoot(),
        IonicModule.forRoot(),
        NgSelectModule],
    providers: [
        HttpClient,
        FormBuilder,
        FullscreenService,
        MenuClassName,
        {
            provide: APP_INITIALIZER,
            useFactory: configFactory,
            deps: [ConfigService],
            multi: true
        },
        AuthGuard,
        {provide: Document, useValue: Document},
        BreadcrumbsService,
        CookieService,
    ],
    exports: [
        PagerComponent
    ],
    bootstrap: [ProxyOutletComponent]
})
export class AppModule {
    constructor(
        cookieService: CookieService,
        translate: TranslateService
    ) {
        let def = cookieService.get('defaultLanguage');

        if (!def)
            def = 'ru';
        translate.setDefaultLang(def);
    }
}
