import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./component/layout/main/main.layout.component";

export const AppRoutes: Routes = [
    {path: '', redirectTo: 'dashboard/invoice', pathMatch: 'full'},
    {
        path: 'dashboard', component: MainLayoutComponent,
        children: [
            {path: 'invoice', loadChildren: () => import('./module/invoice/invoice.module').then(m => m.InvoiceModule)},
            {path: 'settings', loadChildren: () => import('./module/settings/settings.module').then(m => m.SettingsModule)},
        ]
    },
    {path: '**', redirectTo: 'dashboard/error/404', pathMatch: 'full'}
];
