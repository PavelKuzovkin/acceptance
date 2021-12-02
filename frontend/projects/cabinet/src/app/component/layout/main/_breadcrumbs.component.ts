import {Component} from '@angular/core';
import {BreadcrumbsService} from '../../../../../../tools/src/lib/module/common/service/breadcrumbs.service';


@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './_breadcrumbs.component.html',
})
export class BreadcrumbsComponent {
    constructor(
        public breadcrumbs: BreadcrumbsService
    ) {
    }
}
