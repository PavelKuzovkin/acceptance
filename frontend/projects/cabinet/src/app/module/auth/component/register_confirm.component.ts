import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../provider/auth.provider";
import {Router} from "@angular/router";
import {Component, Inject, OnInit} from "@angular/core";
import {TempRegStorage} from "../service/temp.reg.storage";
import {NgProgress, NgProgressRef} from "ngx-progressbar";
import {ToastrService} from "ngx-toastr";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-auth-register-confirm',
    templateUrl: './register_confirm.component.html'
})
export class RegisterConfirmComponent implements OnInit {
    title = 'Confirmation of registration';
    form: FormGroup | undefined;
    submitted = false;
    progressRef: NgProgressRef;

    constructor(
        private fb: FormBuilder,
        private provider: AuthProvider,
        private router: Router,
        private temp: TempRegStorage,
        protected progress: NgProgress,
        protected toasterService: ToastrService,
        @Inject(DOCUMENT) private _document: Document,
    ) {
        this.createForm();
        this.progressRef = this.progress.ref();
    }

    ngOnInit(): void {
        if (this.temp.email) {
            this.createForm();
        } else {
            this.router.navigate(['/registration']);
        }
    }

    createForm(): void {
        this.form = this.fb.group({
            email: [this.temp.email, [Validators.required]],
            code: ['', [Validators.required]]
        });
    }
    onSubmit(): void {
        this.submitted = true;
        if (this.form && this.form.valid) {
            this.progressRef.start()
            const data = this.form.value;

            this.provider.registrationConfirm(data).subscribe(res => {
                if (res && res.status === 200) {
                    // this.router.navigate(['/']);
                    // @ts-ignore
                    this._document?.location = '/';
                } else {
                    this.toasterService.error('Something went wrong. Please contact the administrator.', '500 Internal Server Error');
                }
                this.progressRef.complete();
            });
        }
    }

}
