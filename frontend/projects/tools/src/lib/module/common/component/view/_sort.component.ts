import {Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-sort',
    templateUrl: './_sort.component.html',
})
export class SortComponent {
    @Input() field: string = '';
    @Input() title: string = '';

    order = '';
    queryParams: any = {};

    constructor(
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => {
            this.queryParams = {};
            for (const key in params) {
                this.queryParams[key] = params[key];
            }

            if (this.queryParams.hasOwnProperty('field') && this.queryParams.field === this.field) {
                this.order = this.queryParams.sort;
            } else {
                this.order = '';
            }
        });
    }

    sort() {
        this.order = this.getOrder();
        if (this.order){
            this.queryParams.field = this.field;
            this.queryParams.sort = this.order;
        } else {
            delete this.queryParams.field;
            delete this.queryParams.sort;
        }

        this.router.navigate([], { queryParams: this.queryParams, relativeTo: this.route});
    }

    getOrder(): string {
        if (this.order === '')
            return 'asc';
        if (this.order === 'asc')
            return 'desc';
        return '';
    }
}
