import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../cabinet/src/environments/environment';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from "@ngx-translate/core";

export class AComponent {
    title = '';
    init = false;
    form: FormGroup | undefined;
    protected model: any;
    statelink = {
        page: ''
    };
    submitted = false;
    progressRef: NgProgressRef;
    prefixAction = 'COMMON.ACTION.';
    message: any = {};

    protected constructor(
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        protected translate: TranslateService
    ) {
        this.progressRef = this.progress.ref();

        const prefDel = this.prefixAction + 'REMOVE.';
        const prefSave = this.prefixAction + 'SAVE.';
        const predErr = 'COMMON.ERROR.500.';
        this.translate.get([
            prefDel + 'TITLE',
            prefSave + 'TITLE',
            prefDel + 'CONFIRM',
            prefDel + 'SUCCESS',
            prefDel + 'ERROR',
            prefSave + 'SUCCESS',
            predErr + 'TITLE',
            predErr + 'MESS',
            prefSave + 'ERROR',
            this.prefixAction + 'CANCEL',
            this.prefixAction + 'CONFIRM'
        ]).subscribe(mess => {
            this.message = {
                del: {title: mess[prefDel + 'TITLE'], body: mess[prefDel + 'CONFIRM']},
                delSuccess: {title: mess[prefDel + 'TITLE'], body: mess[prefDel + 'SUCCESS']},
                delError: {title: mess[prefDel + 'TITLE'], body: mess[prefDel + 'ERROR']},
                success: {title: mess[prefSave + 'TITLE'], body: mess[prefSave + 'SUCCESS']},
                error: {title: mess[predErr + 'TITLE'], body: mess[predErr + 'MESS']},
                validate: {title: mess[prefSave + 'TITLE'], body: mess[prefSave + 'ERROR']},
                action: {cancel: mess[this.prefixAction + 'CANCEL'], confirm: mess[this.prefixAction + 'CONFIRM']}
            };
        })
    }

    setTitle(): void {
        if (this.title) {
            this.titleService.setTitle(environment.name + ' - ' + this.title);
        }
    }

    callbackOnInit(): void {}

    createForm(): void {
        this.form = this.fb.group(this.model);
    }

    getFormValue(form: FormGroup): any {
        return form.value;
    }

    save(entity: any, form: FormGroup): void {}

    saveToList(): void {
        this.onSubmit(
            () => {
                this.router.navigateByUrl(this.statelink.page);
            }
        );
    }

    beforeSubmit(): void {}

    onSubmit(callback: any): void {}

    callbackOnSuccess(entity: any, callback: any = null): void {
        if (callback) {
            callback(entity, this.form);
        }
    }

    callbackOnSubmit(entity: any, callback: any = null): void {
        if (entity.status === 200) {
            this.getToaster('success', this.message.success.title, this.message.success.body);
            this.callbackOnSuccess(entity, callback);
        }
        if (entity.status === 400) {
            this.getToaster('warning', this.message.validate.title, this.message.validate.body);
            if (entity.errors) {
                Object.entries(entity.errors).forEach(
                    ([key, value]) => {
                        // @ts-ignore
                      this.form.controls[key].setErrors({required: value[0]});
                    }
                );
            }
            this.callbackOnWarning(entity);
        }
        if (entity.status === 500) {
            this.getToaster('error', this.message.error.title, this.message.error.body);
            this.callbackOnError(entity);
        }
    }

    callbackOnWarning(entity: any): void {}

    callbackOnError(entity: any): void {}

    valueTrim(field: AbstractControl): void {
        if (field.value) {
            field.setValue(field.value.trim());
        }
    }

    cleanDomainName(field: AbstractControl): void {
        const pattern = /^www./;
        if (pattern.test(field.value)) {
            field.setValue(field.value.substring(4));
        }
    }

    isEmpty(data: any): boolean {
        return data != null && Object.keys(data).length > 0;
    }

    getToaster(type: string, title: string, body: string): void {
        if (type === 'success') {
            this.toasterService.success(body, title);
        }
        if (type === 'warning') {
            this.toasterService.warning(body, title);
        }
        if (type === 'error') {
            this.toasterService.error(body, title);
        }
    }
}
