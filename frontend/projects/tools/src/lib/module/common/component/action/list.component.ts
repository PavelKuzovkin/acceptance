import {ActivatedRoute, Router} from '@angular/router';
import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';
import {AComponent} from "../../a.component";
import {IPager, Pager} from "../../model/pager";
import {IProvider} from "../../provider/i.provider";
import {environment} from "../../../../../../../cabinet/src/environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
    template: ''
})
export abstract class ListComponent extends AComponent implements OnInit {
    list: any[] = [];
    moreOptions: any;
    formFilter: FormGroup | undefined;
    filter: {} | undefined;
    isActiveFilter = false;
    perPageList: number[] = [10, 25, 50, 100];
    title: string = '';
    perPage = 10;
    page = 1;
    pager: IPager = {
        currentPage: 1,
        end: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        maxPerPage: 10,
        nbPages: 1,
        nbResult: 1,
        start: 1
    };
    init = false;
    queryParams: any = {};
    progressRef: NgProgressRef;
    query = 'getList';
    search: string = '';
    detectQuery = false;

    protected constructor(
        protected fb: FormBuilder,
        protected router: Router,
        protected route: ActivatedRoute,
        @Inject('IProvider') protected provider: IProvider,
        protected toasterService: ToastrService,
        protected progress: NgProgress,
        protected titleService: Title,
        protected translate: TranslateService
    ) {
        super(router, progress, titleService, toasterService, fb, translate);

        this.progressRef = progress.ref();
    }

    ngOnInit() {
        const per = localStorage.getItem('size');
        if (per) {
            this.perPage = parseInt(per, 10);
            this.queryParams['size'] = this.perPage;
        }
        this.route.queryParams.subscribe(params => {
            this.queryParams = {};
            this.queryParams['size'] = params['size'] || this.perPage;
            this.page = params['page'] || 1;
            for (const key in params) {
                if (key !== 'page') {
                    this.queryParams[key] = params[key];
                }
            }

            this.createFilterForm();
            this.getList();
        });

        this.setTitle();
    }

    setTitle() {
        if (this.title) {
            this.titleService.setTitle(environment.name + ' - ' + this.title);
        }
    }

    getList(): void {
        this.progressRef.start();
        // @ts-ignore
        this.provider[this.query](this.page, this.queryParams)
            .subscribe((list: any) => {
                if (list.status === 200) {
                    this.list = list.content;
                    // this.pager = list.pager;
                    this.pager = new Pager(
                        list.number + 1,
                        list.last ? list.totalElements : (list.number + 1) * list.size,
                        list.number + 1 < list.totalPages,
                        list.number > 0,
                        list.size,
                        list.totalPages,
                        list.totalElements,
                        list.number * list.size + 1
                    )
                    this.moreOptions = list.moreOptions;
                    this.callbackOnInit();
                }
                this.progressRef.complete();
            });
    }

    sortData(event: any) {
        this.queryParams.field = event.active;
        this.queryParams.sort = event.direction;

        this.getList();
    }

    callbackOnInit(): void {
        this.detectQuery = false;
        this.init = true;
    }

    doFilter() {
        this.isActiveFilter = !this.isActiveFilter;
    }

    createFilterForm(): void {
        this.formFilter = this.getCleanFilterForm();
    }

    getCleanFilterForm(): FormGroup {
        return this.fb.group({});
    }

    clearFilter(): void {
        this.formFilter = this.getCleanFilterForm();
        this.getQueryParamsFromFilter();
        this.getList();
    }

    dataChanged(event: any) {
        if (!this.detectQuery) {
            this.queryParams.search = event;
            this.detectQuery = true;
            this.getList();
        }
    }

    beforeSubmitFilter(): void {
    }

    onFilter(): void {
        this.submitted = true;
        if (this.formFilter && this.formFilter.valid) {
            this.getQueryParamsFromFilter();
        }
        this.getList();
    }

    getQueryParamsFromFilter() {
        if (this.formFilter) {
            const temp = this.getFormValue(this.formFilter);
            for (const key in temp) {
                if (temp[key] !== null && temp[key] !== '') {
                    this.queryParams[key] = temp[key];
                } else {
                    delete this.queryParams[key];
                }
            }
        }
    }

    changePerPage(event: any): void {
        this.queryParams['size'] = this.perPage = event;
        localStorage.setItem('size', this.perPage.toString());
        this.getList();
    }

    changePage(event: any): void {
        const queryParams = this.queryParams;
        queryParams.page = event;
        this.router.navigate([this.statelink.page], {queryParams: queryParams, relativeTo: this.route});
    }

    remove(id: number): void {
        this.confirmRemove(() => {
            this.progressRef.start();
            this.provider.delete(id)
                .subscribe((result: any) => {
                    if (result.status == 200) {
                        this.callbackRemove(result);
                    } else {
                        this.getToaster('error', this.message.delError.title, this.message.delError.body);
                    }
                    this.progressRef.complete();
                });
        });
    }

    confirmRemove(action: any): void {
        // @ts-ignore
        Swal.fire({
            title: this.message.del.title,
            text: this.message.del.body,
            showCancelButton: true,
            cancelButtonText: this.message.action.cancel,
            focusConfirm: false,
            confirmButtonColor: '#dc3545',
            confirmButtonText: this.message.action.confirm,
        }).then((isConfirmed: any) => {
            if (isConfirmed.value) {
                if (isConfirmed.value) {
                    action();
                }
            }
        });
    }

    callbackRemove(res: any): void {
        if (res.status === 200) {
            this.getToaster('warning', this.message.delSuccess.title, this.message.delSuccess.body);
            this.getList();
        }
    }

    reset() {
        this.router.navigate([], {queryParams: {}, relativeTo: this.route});
    }


    // protected getQueryString(page: number, queryParams: Object) {
    //     return '?page=' + page + '&' + this.getPartQueryString(queryParams);
    // }
    //
    // protected getPartQueryString(queryParams: Object) {
    //     return Object.keys(queryParams).reduce(function(a, k) {
    //         a.push(k + '=' + encodeURIComponent(queryParams[k]));
    //         return a;
    //     }, []).join('&');
    // }
}
