import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgxPermissionsModule} from "ngx-permissions";
import {NgProgressModule} from "ngx-progressbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MyCommonModule} from "../../../../../tools/src/lib/module/common/common.module";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {IonicModule} from "@ionic/angular";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {QRCodeModule} from "angularx-qrcode";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {SettingsRoutes} from "./settings.routing";
import {EditSettingsComponent} from "./component/edit/edit.component";
import {SettingsProvider} from "./provider/settings.provider";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollY: true,
    swipeEasing: true
};

@NgModule({
    imports: [
        RouterModule.forChild(SettingsRoutes),
        CommonModule,
        MyCommonModule,
        NgxPermissionsModule.forChild(),
        NgProgressModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        BsDatepickerModule,
        CollapseModule,
        IonicModule,
        PerfectScrollbarModule,
        TooltipModule,
        QRCodeModule,
        BsDropdownModule
    ],
    declarations: [
        EditSettingsComponent
    ],
    providers: [
        HttpClient,
        SettingsProvider,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SettingsModule {
}
