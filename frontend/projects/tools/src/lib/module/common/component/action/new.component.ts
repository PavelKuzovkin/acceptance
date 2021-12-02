import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgProgress} from 'ngx-progressbar';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AComponent} from '../../a.component';
import {IProvider} from '../../provider/i.provider';
import {TranslateService} from "@ngx-translate/core";

@Component({
    template: ''
})
export abstract class NewComponent extends AComponent implements OnInit {
    isNew = true;

    protected constructor(
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

    getMoreInfo(): void {
        this.finalInitAction();
    }

    finalInitAction(): void {
        this.createForm();
        this.progressRef.complete();
        this.init = true;
        this.callbackOnInit();
    }

    ngOnInit(): void {
        this.getMoreInfo();
    }

    getFormValue(form: FormGroup): FormGroup {
        if (this.form) {
            this.form.get('id')?.disable();
        }
        return form.value;
    }

    onSubmit(callback: any = null): void {
        this.beforeSubmit();
        this.submitted = true; // set form submit to true

        if (this.form && this.form.valid) {

            const value = this.getFormValue(this.form);
            this.progressRef.start();
            this.provider.create(value)
                .subscribe((entity: any) => {
                    if (!callback) {
                        callback = () => this.save(entity);
                    }
                    this.callbackOnSubmit(entity, callback);
                    this.progressRef.complete();
                });
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

    save(entity: any): void {
        this.router.navigateByUrl(this.statelink.page + '/' + entity.id);
    }

    remove() {
        return false;
    }
}
