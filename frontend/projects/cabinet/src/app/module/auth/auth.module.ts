import {RouterModule} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MyCommonModule} from '../../../../../tools/src/lib/module/common/common.module';
import {HttpClient} from '@angular/common/http';
import {AuthRoutes} from './auth.routing';
import {LoginComponent} from './component/login.component';
import {NgModule} from '@angular/core';
import {NgxPermissionsModule} from 'ngx-permissions';
import {RegisterComponent} from './component/register.component';
import {ForgotPasswordComponent} from './component/forgot.password.component';
import {AuthProvider} from './provider/auth.provider';
import {RegisterConfirmComponent} from "./component/register_confirm.component";
import {TempRegStorage} from "./service/temp.reg.storage";
import {ResetPasswordComponent} from "./component/reset.password.component";
import {TempForgotStorage} from "./service/temp.fogot.storage";
import {TranslateModule} from "@ngx-translate/core";
import {CallbackComponent} from "./component/callback.component";

@NgModule({
    imports: [
        RouterModule.forChild(AuthRoutes),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MyCommonModule,
        NgxPermissionsModule.forChild(),
        TranslateModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        RegisterConfirmComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        CallbackComponent
    ],
    providers: [
        HttpClient,
        FormBuilder,
        AuthProvider,
        TempRegStorage,
        TempForgotStorage
    ]
})

export class AuthModule {}
