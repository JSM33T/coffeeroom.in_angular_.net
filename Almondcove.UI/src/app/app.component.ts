import { Component, OnInit, Renderer2 } from '@angular/core';
import { initializeScrollToTop } from './library/invokers/back-to-top';
import { initializeBindedContentToggle } from './library/invokers/content-toggle';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import InitAnimateOnScroll from './library/invokers/animate-on-scroll';
import InitSmoothScroll from './library/invokers/smooth-scroll';
import SetTheme from './library/invokers/settheme';
import setTheme from './library/invokers/settheme';
import { environment } from '../environments/environment';
import rotateText from './library/utility/well-hello';

@Component({
    selector: 'app-root', 
    template: `
        <!-- <app-ambience></app-ambience> -->
        <main class="page-wrapper">
            <div class="page-loading active">
                <div class="page-loading-inner">
                    <div class="page-spinner"></div>
                    <span id="rotateText">Loading...</span>
                </div>
            </div>
            <ngx-loading-bar></ngx-loading-bar>

            <app-navbar *ngIf="shouldDisplayNavbar()"></app-navbar>

            <app-sidepanel *ngIf="shouldDisplaySidepanel()"></app-sidepanel>

            <router-outlet></router-outlet>
            <app-sidepanel />
            <app-footer *ngIf="shouldDisplayFooter()"></app-footer>
            <a class="btn-scroll-top" href="#top" data-scroll aria-label="Scroll back to top">
                <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></circle>
                </svg>
                <i class="ai-arrow-up"></i>
            </a>
        </main>
    `,
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private renderer: Renderer2,
    ) {}

    title = 'ALmondcove by Jass';

    shouldDisplayNavbar(): boolean {
        return !['/auth/login', '/auth/signup', '/auth'].includes(this.router.url);
    }

    shouldDisplaySidepanel(): boolean {
        return !['/auth/login', '/auth/signup', '/auth'].includes(this.router.url);
    }

    shouldDisplayFooter(): boolean {
        return !['/auth/login', '/auth/signup', '/auth'].includes(this.router.url);
    }

    removeActiveClass() {
        const loadingElement = this.renderer.selectRootElement('.page-loading', true);
        this.renderer.removeClass(loadingElement, 'active');
    }

    ngOnInit() {
        setInterval(rotateText, 100);
        // initializeBindedContentToggle();
        setTheme();
        setTimeout(() => {
            this.removeActiveClass();
        }, environment.loaderWait);

        this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((event) => {
            window.scrollTo({ top: 0 });
            InitSmoothScroll();
            InitAnimateOnScroll();
            initializeScrollToTop();
            hideOffcanvas();
        });
    }
}

function hideOffcanvas() {
    var offcanvasElement = document.getElementById('customizer');
    //@ts-ignore
    var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    //@ts-ignore
    if (offcanvasElement?.classList.contains('show')) {
        offcanvasInstance.hide();
    }
}
