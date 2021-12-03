import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./component/layout/main/main.layout.component";

export const AppRoutes: Routes = [
    {path: '', redirectTo: 'dashboard/invoice', pathMatch: 'full'},
    {
        path: 'dashboard', component: MainLayoutComponent,
        children: [
            {path: 'user', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)},
            {path: 'invoice', loadChildren: () => import('./module/invoice/invoice.module').then(m => m.InvoiceModule)},
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
