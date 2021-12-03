import {Routes} from "@angular/router";
import {EditSettingsComponent} from "./component/edit/edit.component";


export const SettingsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: ':id',
            component: EditSettingsComponent
        }
        ]
    }
]
