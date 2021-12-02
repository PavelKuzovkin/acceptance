import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgProgress} from 'ngx-progressbar';
import {FormBuilder} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {AComponent} from "../../a.component";
import {IProvider} from "../../provider/i.provider";

@Component({
    template: ''
})
export abstract class ShowComponent extends AComponent implements OnInit {
    id: string = '';

    protected constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        @Inject('IProvider') protected provider: IProvider,
    ) {
        super(router, progress, titleService, toasterService, fb);
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        this.init = false;
        this.progressRef.start();

        this.provider.get(this.id)
            .subscribe((model: any) => {
                this.model = model;
                this.init = true;
                this.progressRef.complete();
                this.callbackOnInit();
            });
    }
}
