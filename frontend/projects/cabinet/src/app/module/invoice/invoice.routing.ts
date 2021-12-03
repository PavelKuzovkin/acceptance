import {Routes} from "@angular/router";
import {IndexInvoiceComponent} from "./component/list/index.component";
import {NewInvoiceComponent} from "./component/new/new.component";
import {CloseInvoiceComponent} from "./component/close/close.component";


export const InvoiceRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: IndexInvoiceComponent
        }, {
            path: 'new',
            component: NewInvoiceComponent
        }, {
            path: ':id',
            component: CloseInvoiceComponent
        }
        ]
    }
]
