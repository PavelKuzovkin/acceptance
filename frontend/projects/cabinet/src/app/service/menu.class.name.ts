import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class MenuClassName {
    menuHiddenBreakpoint = 768;
    menuClickCount = 0;
    allMenuClassNames = 'menu-default menu-hidden sub-hidden main-hidden menu-sub-hidden main-show-temporary sub-show-temporary menu-mobile';
    lastActiveSubmenu = '';

    setMenuClassNames(clickIndex: number, calledFromResize = true, link = null): void {

        this.menuClickCount = clickIndex;
        const container = $('#app-container');
        if (container.length === 0) {
            return;
        }

        link = link || this.getActiveMainMenuLink();

        function resizeCarousel(): void {
            setTimeout( () => {
                const event = document.createEvent('HTMLEvents');
                event.initEvent('resize', false, false);
                window.dispatchEvent(event);
            }, 350);
        }
        // menu-default no subpage
        if (
            $('.sub-menu ul[data-link=\'' + link + '\']').length === 0 &&
            (this.menuClickCount === 2 || calledFromResize)
        ) {
            if ($(window).outerWidth() >= this.menuHiddenBreakpoint) {
                if (this.isClassIncludedApp('menu-default')) {
                    if (calledFromResize) {
                        container.removeClass(this.allMenuClassNames);
                        container.addClass('menu-default menu-sub-hidden sub-hidden');
                        this.menuClickCount = 1;
                    } else {
                        container.removeClass(this.allMenuClassNames);
                        container.addClass('menu-default main-hidden menu-sub-hidden sub-hidden');
                        this.menuClickCount = 0;
                    }
                    resizeCarousel();
                    return;
                }
            }
        }
        // menu-sub-hidden no subpage
        if (
            $('.sub-menu ul[data-link=\'' + link + '\']').length === 0 &&
            (this.menuClickCount === 1 || calledFromResize)
        ) {
            if ($(window).outerWidth() >= this.menuHiddenBreakpoint) {
                if (this.isClassIncludedApp('menu-sub-hidden')) {
                    if (calledFromResize) {
                        container.removeClass(this.allMenuClassNames);
                        container.addClass('menu-sub-hidden sub-hidden');
                        this.menuClickCount = 0;
                    } else {
                        container.removeClass(this.allMenuClassNames);
                        container.addClass('menu-sub-hidden main-hidden sub-hidden');
                        this.menuClickCount = -1;
                    }
                    resizeCarousel();
                    return;
                }
            }
        }
        // menu-sub-hidden no subpage
        if (
            $('.sub-menu ul[data-link=\'' + link + '\']').length === 0 &&
            (this.menuClickCount === 1 || calledFromResize)
        ) {
            if ($(window).outerWidth() >= this.menuHiddenBreakpoint) {
                if (this.isClassIncludedApp('menu-hidden')) {
                    if (calledFromResize) {
                        container.removeClass(this.allMenuClassNames);
                        container.addClass('menu-hidden main-hidden sub-hidden');
                        this.menuClickCount = 0;
                    } else {
                        container.removeClass(this.allMenuClassNames);
                        container.addClass('menu-hidden main-show-temporary');
                        this.menuClickCount = 3;
                    }
                    resizeCarousel();
                    return;
                }
            }
        }

        let nextClasses;
        if (clickIndex % 4 === 0) {
            if (this.isClassIncludedApp('menu-main-hidden')) {
                nextClasses = 'menu-main-hidden';
            } else if (
                this.isClassIncludedApp('menu-default') &&
                this.isClassIncludedApp('menu-sub-hidden')
            ) {
                nextClasses = 'menu-default menu-sub-hidden';
            } else if (this.isClassIncludedApp('menu-default')) {
                nextClasses = 'menu-default';
            } else if (this.isClassIncludedApp('menu-sub-hidden')) {
                nextClasses = 'menu-sub-hidden';
            } else if (this.isClassIncludedApp('menu-hidden')) {
                nextClasses = 'menu-hidden';
            }
            this.menuClickCount = 0;
        } else if (clickIndex % 4 === 1) {
            if (
                this.isClassIncludedApp('menu-default') &&
                this.isClassIncludedApp('menu-sub-hidden')
            ) {
                nextClasses = 'menu-default menu-sub-hidden main-hidden sub-hidden';
            } else if (this.isClassIncludedApp('menu-default')) {
                nextClasses = 'menu-default sub-hidden';
            } else if (this.isClassIncludedApp('menu-main-hidden')) {
                nextClasses = 'menu-main-hidden menu-hidden';
            } else if (this.isClassIncludedApp('menu-sub-hidden')) {
                nextClasses = 'menu-sub-hidden main-hidden sub-hidden';
            } else if (this.isClassIncludedApp('menu-hidden')) {
                nextClasses = 'menu-hidden main-show-temporary';
            }
        } else if (clickIndex % 4 === 2) {
            if (this.isClassIncludedApp('menu-main-hidden') && this.isClassIncludedApp('menu-hidden')) {
                nextClasses = 'menu-main-hidden';
            } else if (
                this.isClassIncludedApp('menu-default') &&
                this.isClassIncludedApp('menu-sub-hidden')
            ) {
                nextClasses = 'menu-default menu-sub-hidden sub-hidden';
            } else if (this.isClassIncludedApp('menu-default')) {
                nextClasses = 'menu-default main-hidden sub-hidden';
            } else if (this.isClassIncludedApp('menu-sub-hidden')) {
                nextClasses = 'menu-sub-hidden sub-hidden';
            } else if (this.isClassIncludedApp('menu-hidden')) {
                nextClasses = 'menu-hidden main-show-temporary sub-show-temporary';
            }
        } else if (clickIndex % 4 === 3) {
            if (this.isClassIncludedApp('menu-main-hidden')) {
                nextClasses = 'menu-main-hidden menu-hidden';
            } else if (
                this.isClassIncludedApp('menu-default') &&
                this.isClassIncludedApp('menu-sub-hidden')
            ) {
                nextClasses = 'menu-default menu-sub-hidden sub-show-temporary';
            } else if (this.isClassIncludedApp('menu-default')) {
                nextClasses = 'menu-default sub-hidden';
            } else if (this.isClassIncludedApp('menu-sub-hidden')) {
                nextClasses = 'menu-sub-hidden sub-show-temporary';
            } else if (this.isClassIncludedApp('menu-hidden')) {
                nextClasses = 'menu-hidden main-show-temporary';
            }
        }
        if (this.isClassIncludedApp('menu-mobile')) {
            nextClasses += ' menu-mobile';
        }
        container.removeClass(this.allMenuClassNames);
        container.addClass(nextClasses);
        resizeCarousel();
    }

    getActiveMainMenuLink(): any {
        const dataLink = $('.main-menu ul li.active a').attr('href');
        return dataLink ? dataLink.replace('#', '') : '';
    }

    isClassIncludedApp(className: string): any{
        const container = $('#app-container');
        const currentClasses = container
            .attr('class')
            .split(' ')
            .filter((x: string) => {
                return x !== '';
            });
        return currentClasses.includes(className);
    }

    showSubMenu(dataLink: string): void {
        if ($('.main-menu').length === 0) {
            return;
        }

        const link = dataLink ? dataLink.replace('#', '') : '';
        if ($('.sub-menu ul[data-link=\'' + link + '\']').length === 0) {
            $('#app-container').removeClass('sub-show-temporary');

            if ($('#app-container').length === 0) {
                return;
            }

            if (
                this.isClassIncludedApp('menu-sub-hidden') ||
                this.isClassIncludedApp('menu-hidden')
            ) {
                this.menuClickCount = 0;
            } else {
                this.menuClickCount = 1;
            }
            $('#app-container').addClass('sub-hidden');
            this.noTransition();
            return;
        }
        if (link === this.lastActiveSubmenu) {
            return;
        }
        $('.sub-menu ul').fadeOut(0);
        $('.sub-menu ul[data-link=\'' + link + '\']').slideDown(100);

        $('.sub-menu .scroll').scrollTop(0);
        this.lastActiveSubmenu = link;
    }

    noTransition(): void {
        $('.sub-menu').addClass('no-transition');
        $('main').addClass('no-transition');
        setTimeout(() => {
            $('.sub-menu').removeClass('no-transition');
            $('main').removeClass('no-transition');
        }, 350);
    }
}
