import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppValidators} from '../../../../../../tools/src/lib/module/common/validator/app.validator';
import {AuthProvider} from '../provider/auth.provider';
import {ToastrService} from "ngx-toastr";
import {TempRegStorage} from "../service/temp.reg.storage";
import {NgProgress, NgProgressRef} from "ngx-progressbar";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-auth-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    title = 'Registration';
    form: FormGroup | undefined;
    submitted = false;
    progressRef: NgProgressRef;

    constructor(
        private fb: FormBuilder,
        private provider: AuthProvider,
        private router: Router,
        protected toasterService: ToastrService,
        private temp: TempRegStorage,
        protected progress: NgProgress,
        @Inject(DOCUMENT) private _document: Document,
    ) {
        this.createForm();
        this.progressRef = this.progress.ref();
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = this.fb.group({
            lastName: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.minLength(8)]],
            confirmPassword: ['', [Validators.minLength(8), AppValidators.MatchPassword]],
        });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.form && this.form.valid) {
            const data = {
                login: this.form.value.email,
                password: this.form.value.password
            }

            this.progressRef.start();
            this.provider.registration(data).subscribe(res => {
                this.progressRef.complete();
                console.log(res)
                if (res && res.status === 200) {
                    // this.temp.email = data.login;
                    // this.router.navigate(['/registration_confirmation']);
                    // @ts-ignore
                    this._document?.location = '/'
                } else if (res && res.status === 400) {
                    // @ts-ignore
                    this.form.get('email').setErrors({emailUnique: true})
                    this.toasterService.warning('check the correctness of filling in the fields and send the request again', 'Form error');
                } else {
                    this.toasterService.error('Something went wrong. Please contact the administrator.', '500 Internal Server Error');
                }
            });

        }
    }
}
