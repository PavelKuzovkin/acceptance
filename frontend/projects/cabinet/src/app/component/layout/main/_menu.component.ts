import {AfterViewInit, Component} from '@angular/core';
import {MenuClassName} from "../../../service/menu.class.name";
import {AuthenticationService} from "../../../../../../tools/src/lib/module/common/service/authentication.service";
import {Router} from "@angular/router";

declare var $: any;

@Component({
    selector: 'app-menu',
    templateUrl: './_menu.component.html',
})
export class MenuComponent implements AfterViewInit{
    menuClickCount = 0;
    lastActiveSubmenu = '';

    constructor(
        private router: Router,
        private menuClassName: MenuClassName,
        private authenticationService: AuthenticationService
    ) {
    }

    ngAfterViewInit(): void {
        $('.menu-button').on('click', (event: any) => {
            event.preventDefault();
            this.menuClassName.setMenuClassNames(++this.menuClickCount);
        });

        $('.menu-button-mobile').on('click', (event: any) => {
            event.preventDefault();
            $('#app-container')
                .removeClass('sub-show-temporary')
                .toggleClass('main-show-temporary');
            return false;
        });

        $('.main-menu').on('click', 'a', (event: any) => {
            event.preventDefault();

            const link = $(event.currentTarget)
                .attr('href')
                .replace('#', '');

            if ($('.sub-menu ul[data-link=\'' + link + '\']').length === 0) {
                const target = $(this).attr('target');
                if ($(event.currentTarget).attr('target') === null || $(event.currentTarget).attr('target') === undefined) {
                    // window.open(link, '_self');
                } else {
                    console.log(target);
                    window.open(link, target);
                }
                return;
            }

            this.menuClassName.showSubMenu($(event.currentTarget).attr('href'));

            const container = $('#app-container');
            if (!container.hasClass('menu-mobile')) {
                if (
                    container.hasClass('menu-sub-hidden') &&
                    (this.menuClickCount === 2 || this.menuClickCount === 0)
                ) {
                    this.menuClassName.setMenuClassNames(3, false, link);
                } else if (
                    container.hasClass('menu-hidden') &&
                    (this.menuClickCount === 1 || this.menuClickCount === 3)
                ) {
                    this.menuClassName.setMenuClassNames(2, false, link);
                } else if (
                    container.hasClass('menu-default') &&
                    !container.hasClass('menu-sub-hidden') &&
                    (this.menuClickCount === 1 || this.menuClickCount === 3)
                ) {
                    this.menuClassName.setMenuClassNames(0, false, link);
                }
            } else {
                container.addClass('sub-show-temporary');
            }
            return false;
        });

        $(document).on('click', (event: any) => {
            if (
                !(
                    $(event.target)
                        .parents()
                        .hasClass('menu-button') ||
                    $(event.target).hasClass('menu-button') ||
                    $(event.target)
                        .parents()
                        .hasClass('sidebar') ||
                    $(event.target).hasClass('sidebar')
                )
            ) {
                // Prevent sub menu closing on collapse click
                if ($(event.target).parents('a[data-toggle=\'collapse\']').length > 0 || $(event.target).attr('data-toggle') === 'collapse') {
                    return;
                }
                if ($('#app-container').hasClass('menu-sub-hidden') && this.menuClickCount === 3) {
                    const link = this.menuClassName.getActiveMainMenuLink();
                    if (link === this.lastActiveSubmenu) {
                        this.menuClassName.setMenuClassNames(2);
                    } else {
                        this.menuClassName.setMenuClassNames(0);
                    }
                } else if ($('#app-container').hasClass('menu-main-hidden') && $('#app-container').hasClass('menu-mobile')) {
                    this.menuClassName.setMenuClassNames(0);
                } else if ($('#app-container').hasClass('menu-hidden') || $('#app-container').hasClass('menu-mobile')) {
                    this.menuClassName.setMenuClassNames(0);
                } else {
                    this.menuClassName.setMenuClassNames(2);
                }
            }
        });

        this.menuClassName.showSubMenu($('.main-menu ul li.active a').attr('href'));

        $('main').addClass('default-transition');
        $('.main-menu').addClass('default-transition');
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');

        return false;
    }
}
