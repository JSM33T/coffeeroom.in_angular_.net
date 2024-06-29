import { Component, OnInit } from '@angular/core';
import { initializeNavbarSticky } from './library/invokers/sticky-navbar';
import { initializeThemeSwitcher } from './library/invokers/theme-switcher';
import { initializeNavbarToggle } from './library/invokers/navbar-toggle';
import { initializeScrollToTop } from './library/invokers/back-to-top';
import { initializeBindedContentToggle } from './library/invokers/content-toggle';
import { ScrollService } from './services/scrollinit.service.spec';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import InitAnimateOnScroll from './library/invokers/animate-on-scroll';
import initParallax from './library/invokers/parallax';
import InitSmoothScroll from './library/invokers/smooth-scroll';

@Component({
    selector: 'app-root',
    template: `
        <main class="page-wrapper">
            <!-- Conditionally hide app-navbar on 'login' and 'signup' routes -->
            <app-navbar *ngIf="shouldDisplayNavbar()"></app-navbar>

            <!-- Conditionally hide app-sidepanel on 'login' and 'signup' routes -->
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
    constructor(private router: Router) {}

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

    ngOnInit() {
        initializeThemeSwitcher();
        initializeBindedContentToggle();

        this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((event) => {
            window.scrollTo({ top: 0 });
            InitSmoothScroll();
            InitAnimateOnScroll();
            initializeScrollToTop();
            initParallax();
        });
    }
}

function hideOffcanvas() {
    const offcanvasElement = document.getElementById('thisone');
    if (offcanvasElement) {
        //@ts-ignore
        const offcanvasInstance = Offcanvas.getInstance(offcanvasElement) || new Offcanvas(offcanvasElement);
        offcanvasInstance.hide();
    }
}
