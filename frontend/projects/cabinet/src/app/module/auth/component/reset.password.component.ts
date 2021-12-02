import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../provider/auth.provider';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {ToastrService} from 'ngx-toastr';
import {TempForgotStorage} from '../service/temp.fogot.storage';
import {AppValidators} from '../../../../../../tools/src/lib/module/common/validator/app.validator';

@Component({
    selector: 'app-auth-reset-password',
    templateUrl: './reset.password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    title = 'Reset the password';
    form: FormGroup | undefined;
    resetForm: FormGroup | undefined;
    submitted = false;
    progressRef: NgProgressRef;
    showResetForm = false;
    passwordValid = true;
    confirmPasswordValid = true;
    codeValid = true;

    constructor(
        private fb: FormBuilder,
        private provider: AuthProvider,
        private router: Router,
        private temp: TempForgotStorage,
        protected progress: NgProgress,
        protected toasterService: ToastrService,
    ) {
        this.createForm();
        this.progressRef = this.progress.ref();
    }

    ngOnInit(): void {
        if (this.temp.email) {
            this.createForm();
        } else {
            this.router.navigate(['/forgot_password']);
        }
    }

    createForm(): void {
        this.form = this.fb.group({
            email: [this.temp.email, [Validators.required]],
            code: ['', [Validators.required]]
        });

        this.resetForm = this.fb.group({
            email: [this.temp.email, [Validators.required]],
            code: ['', [Validators.required]],
            password: ['', [Validators.minLength(8)]],
            confirmPassword: ['', [Validators.minLength(8), AppValidators.MatchPassword]],
        });
    }
    onSubmit(): void {
        this.submitted = true;

        // @ts-ignore
        this.codeValid = this.form.get('code').valid;

        if (this.form && this.form.valid) {
            this.progressRef.start();
            const data = this.form.value;

            this.provider.userCheck(data).subscribe(res => {
                if (res && res.status === 200) {
                    this.submitted = false;
                    this.showResetForm = true;
                    // @ts-ignore
                    this.resetForm.get('code').setValue(this.form.get('code').value);
                } else if (res && res.status === 400) {
                    // @ts-ignore
                    this.form.get('code').setErrors({wrongCode: true});
                    this.toasterService.warning('Проверьте правильность заполнения полей и отправьте заявку повторно', 'Ошибка формы');
                } else {
                    this.toasterService.error('Что-то пошло не так. Обратитесь к администратору.', '500 Internal Server Error');
                }
                this.progressRef.complete();
            });
        }
    }

    onReset(): void {
        this.submitted = true;

        if (this.resetForm)
        { // @ts-ignore
            this.passwordValid = this.resetForm.get('password').valid;
            // @ts-ignore
            this.confirmPasswordValid =  this.resetForm.get('confirmPassword').valid;
        }

        if (this.resetForm && this.resetForm.valid) {
            this.progressRef.start();
            const data = this.resetForm.value;

            this.provider.passwordReset(data).subscribe(res => {
                if (res && res.status === 200) {
                    this.router.navigate(['/login']);
                    this.toasterService.success('Пароль успешно обновлен');
                } else {
                    this.toasterService.error('Что-то пошло не так. Обратитесь к администратору.', '500 Internal Server Error');
                }
                this.progressRef.complete();
            });

        }
    }
}
