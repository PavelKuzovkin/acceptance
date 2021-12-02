import {Routes} from "@angular/router";
import {IndexUserComponent} from "./component/list/index.component";
import {NewUserComponent} from "./component/new/new.component";
import {EditUserComponent} from "./component/edit/edit.component";
import {AuthGuard} from "../../../../../tools/src/lib/module/common/service/auth.guard.service";


export const UserRoutes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuard],
        children: [{
            path: '',
            component: IndexUserComponent
        }, {
            path: 'new',
            component: NewUserComponent
        }, {
            path: ':id',
            component: EditUserComponent
        }
        ]
    }
]
