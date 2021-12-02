import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./component/layout/main/main.layout.component";
import {AuthLayoutComponent} from "./component/layout/auth/auth.layout.component";

export const AppRoutes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
        path: 'dashboard', component: MainLayoutComponent,
        children: [
            {path: 'user', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)},
        ]
    },
    // {
    //     path: '', component: AuthLayoutComponent,
    //     children: [
    //         {path: '', loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule)}
    //     ]
    // },
    {path: '**', redirectTo: 'dashboard/error/404', pathMatch: 'full'}
];
