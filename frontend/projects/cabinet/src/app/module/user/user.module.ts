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
import {UserRoutes} from "./user.routing";
import {UserProvider} from "./provider/user.provider";
import {UserService} from "./service/user.service";
import {IndexUserComponent} from "./component/list/index.component";
import {EditUserComponent} from "./component/edit/edit.component";
import {NewUserComponent} from "./component/new/new.component";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollY: true,
    swipeEasing: true
};

@NgModule({
    imports: [
        RouterModule.forChild(UserRoutes),
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
        IndexUserComponent,
        NewUserComponent,
        EditUserComponent
    ],
    providers: [
        HttpClient,
        UserProvider,
        UserService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserModule {
}
