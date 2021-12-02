import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgProgress} from 'ngx-progressbar';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';
import {AComponent} from '../../a.component';
import {IProvider} from '../../provider/i.provider';
import {TranslateService} from "@ngx-translate/core";

@Component({
    template: ''
})
export abstract class EditComponent extends AComponent implements OnInit {
    id: number|null = null;
    isNew = false;

    protected constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        @Inject('IProvider') protected provider: IProvider,
        protected translate: TranslateService
    ) {
        super(router, progress, titleService, toasterService, fb, translate);
    }

    ngOnInit(): void {
        this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));

        this.getEntity();
    }

    getEntity(): void {
        this.init = false;
        this.progressRef.start();
        if (this.id) {
            this.provider.get(this.id)
                .subscribe((model: any) => {
                    if (model.status === 404) {
                        this.progressRef.complete();
                        this.router.navigateByUrl('admin/404');
                    } else {
                        this.model = model;
                        this.getMoreInfo();
                    }
                });
        } else {
            this.router.navigateByUrl(this.statelink.page);
        }
    }

    getMoreInfo(): void {
        this.finalInitAction();
    }

    finalInitAction(): void {
        this.createForm();
        this.progressRef.complete();
        this.init = true;
        this.callbackOnInit();
    }

    onSubmit(callback: any = null): void {
        this.submitted = true; // set form submit to true
        this.beforeSubmit();

        if (this.form && this.form.valid) {
            const value = this.getFormValue(this.form);

            this.progressRef.start();
            if (this.id) {
                this.provider.update(this.id, value)
                    .subscribe((entity: any) => {
                        if (!callback) {
                            callback = this.save;
                        }
                        this.callbackOnSubmit(entity, callback);
                        this.progressRef.complete();
                    });
            } else {
                this.getToaster('danger', this.message.error.title, this.message.error.body);
            }
        } else {
            this.getToaster('warning', this.message.validate.title, this.message.validate.body);
            if (this.form) {
                Object.keys(this.form?.controls).forEach(field => {
                    if (!this.form?.get(field)?.valid) {
                        console.log(field, this.form?.get(field)?.errors);
                        // this.form.get(field)
                    }
                });
            }
        }
    }

    remove(): void {
        this.confirmRemove(() => {
            this.progressRef.start();
            if (this.id) {
                this.provider.delete(this.id)
                    .subscribe((result: any) => {
                        this.callbackRemove(result);
                        this.progressRef.complete();
                    });
            } else {
                this.getToaster('danger', this.message.error.title, this.message.error.body);
            }
        });
    }

    confirmRemove(action: any): void {
        // @ts-ignore
        Swal.fire({
            title: this.message.del.title,
            text: this.message.del.body,
            // type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отменить',
            focusConfirm: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да',
        }).then((isConfirmed: any) => {
            if (isConfirmed.value) {
                action();
            }
        });
    }

    callbackRemove(res: any): void {
        if (res.status === 200) {
            this.getToaster('warning', this.message.delSuccess.title, this.message.delSuccess.body);
            this.router.navigateByUrl(this.statelink.page);
        }
    }
}
