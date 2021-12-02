import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthProvider} from '../provider/auth.provider';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {ToastrService} from 'ngx-toastr';
import {TempForgotStorage} from '../service/temp.fogot.storage';

@Component({
    selector: 'app-auth-forgot-password',
    templateUrl: './forgot.password.component.html'
})
export class ForgotPasswordComponent implements OnInit{
    title = 'Forgot password';
    form: FormGroup|undefined;
    submitted = false;
    progressRef: NgProgressRef;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private element: ElementRef,
        private provider: AuthProvider,
        protected progress: NgProgress,
        protected toasterService: ToastrService,
        private temp: TempForgotStorage
    ) {
        this.createForm();
        this.progressRef = this.progress.ref();
    }
    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.form && this.form.valid) {
            // @ts-ignore
            this.temp.email = this.form.get('email').value;
            this.progressRef.start();
            this.provider.forgotPassword(this.form.value).subscribe(res => {
                this.progressRef.complete();
                if (res && res.status === 200) {
                    this.router.navigate(['/password_reset']);
                } else if (res && res.status === 404) {
                    // @ts-ignore
                    this.form.get('email').setErrors({emailNotFound: true});
                    this.toasterService.error('проверьте правильность заполнения полей и отправьте заявку повторно', 'Ошибка формы');
                } else {
                    this.toasterService.error('Что-то пошло не так. Обратитесь к администратору.', '500 Internal Server Error');
                }
            });
        }
    }
}
