import {NgModule} from '@angular/core';
import {MapToIterablePipe} from './pipe/map.to.iterable.pipe';
import {UserProvider} from './provider/user.provider';
import {NgProgressModule} from 'ngx-progressbar';
import {PagerComponent} from "./component/view/_pager.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FormInputComponent} from "./component/form/input.component";
import {FormTextComponent} from "./component/form/text.component";
import {FormSelectComponent} from "./component/form/select.component";
import {FormDatepickerComponent} from "./component/form/datepicker.component";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormDaterangepickerComponent} from "./component/form/daterangepicker.component";
import {FormPasswordComponent} from "./component/form/password.component";
import {TranslateModule} from "@ngx-translate/core";
import {DatetimePickerComponent} from "./component/form/datetimepicker.component";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {DateService} from "./service/date.service";
import {FormNumberComponent} from "./component/form/number.component";
import {FormErrorComponent} from "./component/form/error.component";
import {FormCheckboxComponent} from "./component/form/checkbox.component";
import {FormRadioComponent} from "./component/form/radio.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {UtmFormComponent} from "./component/form/utm.form.component";
import {IonicModule} from "@ionic/angular";
import {UtmHelpModalComponent} from "./component/form/utm.help.modal.component";
import {BaseLanguageProvider} from "./provider/language.provider";
import {SortComponent} from "./component/view/_sort.component";
import {CountryService} from "./service/country.service";
import {IntegrationProvider} from "./provider/integration.provider";

@NgModule({
    imports: [
        CommonModule,
        NgProgressModule,
        PaginationModule,
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule,
        TranslateModule,
        TimepickerModule,
        NgSelectModule,
        IonicModule
    ],
    declarations: [
        MapToIterablePipe,
        PagerComponent,
        FormInputComponent,
        FormNumberComponent,
        FormTextComponent,
        FormSelectComponent,
        FormDatepickerComponent,
        FormDaterangepickerComponent,
        FormPasswordComponent,
        DatetimePickerComponent,
        FormErrorComponent,
        FormCheckboxComponent,
        FormRadioComponent,
        UtmFormComponent,
        UtmHelpModalComponent,
        SortComponent
    ],
    exports: [
        MapToIterablePipe,
        PagerComponent,
        FormInputComponent,
        FormNumberComponent,
        FormTextComponent,
        FormSelectComponent,
        FormDatepickerComponent,
        FormDaterangepickerComponent,
        FormPasswordComponent,
        DatetimePickerComponent,
        FormErrorComponent,
        FormCheckboxComponent,
        FormRadioComponent,
        UtmFormComponent,
        UtmHelpModalComponent,
        SortComponent
    ],
    providers: [
        UserProvider,
        DateService,
        BaseLanguageProvider,
        CountryService,
        IntegrationProvider
    ]
})

export class MyCommonModule {}
