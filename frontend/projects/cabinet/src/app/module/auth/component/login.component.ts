import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../../../tools/src/lib/module/common/service/authentication.service';
import {NgProgress, NgProgressRef} from "ngx-progressbar";
import {DOCUMENT} from "@angular/common";
import {ConfigService} from "../../../../../../tools/src/lib/module/common/service/config.service";

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    title = 'Authentication';
    form: FormGroup | undefined;
    submitted = false;
    progressRef: NgProgressRef;
    authUrl: string | undefined;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private element: ElementRef,
        private authenticationService: AuthenticationService,
        protected progress: NgProgress,
        @Inject(DOCUMENT) private _document: Document,
        private configService: ConfigService
    ) {

        const info = localStorage.getItem('currentUser');
        if (typeof info === 'string' && info) {
            const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
            if (currentUser) {
                this.redirectToCabinet();
            }
        }

        this.createForm();
        this.progressRef = this.progress.ref();
        this.progressRef.complete();

        if (configService.config)
            this.authUrl = configService.config.authUrl;
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.form && this.form.valid) {
            const data = {
                email: this.form.value.email,
                password: this.form.value.password
            };
            this.progressRef.start();
            this.authenticationService.login(data)
                .subscribe(result => {
                    this.progressRef.complete();
                    if (result && result.status === 200) {
                        // this.router.navigate(['/']);
                        this.redirectToCabinet();
                    } else {
                        // @ts-ignore
                        this.form.get('password').setErrors({incorrect: true});
                    }
                });
        }
    }

    redirectToCabinet() {
        // @ts-ignore
        this.route.queryParamMap.subscribe(test => {
            const token = test.get('token');
            let query = '/';
            if (token) {
                query = '/?token=' + token
            }

            // @ts-ignore
            this._document?.location = query;
        });
    }
}
