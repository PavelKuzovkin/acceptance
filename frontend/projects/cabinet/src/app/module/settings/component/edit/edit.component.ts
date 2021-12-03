import {Component, OnInit} from "@angular/core";
import {EditComponent} from "../../../../../../../tools/src/lib/module/common/component/action/edit.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgProgress} from "ngx-progressbar";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {SettingsProvider} from "../../provider/settings.provider";

@Component({
    selector: 'app-settings-close',
    templateUrl: './edit.component.html'
})
export class EditSettingsComponent extends EditComponent implements OnInit {
    prefix = 'SETTINGS';

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        protected provider: SettingsProvider,
        protected translate: TranslateService
    ) {
        super(route, router, progress, titleService, toasterService, fb, provider, translate);
        this.statelink.page = '/dashboard/settings';
        console.log('===============')
    }
}
