import {Routes} from '@angular/router';
import {LoginComponent} from './component/login.component';
import {RegisterComponent} from './component/register.component';
import {ForgotPasswordComponent} from './component/forgot.password.component';
import {RegisterConfirmComponent} from "./component/register_confirm.component";
import {ResetPasswordComponent} from "./component/reset.password.component";
import {CallbackComponent} from "./component/callback.component";

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'login',
            component: LoginComponent
        }, {
            path: 'registration',
            component: RegisterComponent
        }, {
            path: 'registration_confirmation',
            component: RegisterConfirmComponent
        }, {
            path: 'forgot_password',
            component: ForgotPasswordComponent
        }, {
            path: 'password_reset',
            component: ResetPasswordComponent
        }, {
            path: 'callback',
            component: CallbackComponent
        }]
    }
];
