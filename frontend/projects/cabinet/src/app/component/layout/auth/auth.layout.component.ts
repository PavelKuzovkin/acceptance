import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-layout-auth',
    templateUrl: './auth.layout.component.html',
    styleUrls: [
        "../../../../assets/css/style.css",
        "../../../../assets/css/tablet.css",
        "../../../../assets/css/desktop.css",
        "../../../../assets/css/layout.css",
    ],
    encapsulation: ViewEncapsulation.None
})
export class AuthLayoutComponent implements AfterViewInit {
    ngAfterViewInit() {
        const className = 'inner ltr rounded web menu-default menu-sub-hidden sub-hidden';

        const container = $('#app-container');
        if (container.length === 0) {
            return;
        }

        container.addClass(className);
    }
}
