import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPager} from "../../model/pager";

@Component({
    selector: 'app-pager',
    templateUrl: './_pager.component.html',
})
export class PagerComponent implements OnInit {
    @Input() pager: IPager | undefined;
    @Output() perPageChanged = new EventEmitter<number>();
    @Output() pageChanged = new EventEmitter<number>();

    perPage: number = 10;
    prefix = 'COMMON.PAGER.';

    ngOnInit(): void {
        if (this.pager)
            this.perPage = this.pager.maxPerPage;
    }

    changePerPage() {
        this.perPageChanged.emit(this.perPage);
    }

    changePage(event: any) {
        this.pageChanged.emit(event.page);
    }
}
