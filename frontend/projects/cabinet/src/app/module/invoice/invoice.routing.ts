import {Routes} from "@angular/router";
import {IndexInvoiceComponent} from "./component/list/index.component";
import {NewInvoiceComponent} from "./component/new/new.component";


export const InvoiceRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: IndexInvoiceComponent
        }, {
            path: 'new',
            component: NewInvoiceComponent
        }
            // {
            //     path: ':id',
            //     component: EditUserComponent
            // }
        ]
    }
]
