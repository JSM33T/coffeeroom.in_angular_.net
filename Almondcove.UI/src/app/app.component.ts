import { Component, OnInit, Renderer2 } from '@angular/core';
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
            <div class="page-loading active">
                <div class="page-loading-inner">
                    <div class="page-spinner"></div>
                    <span>Loading...</span>
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
    constructor(private router: Router, private renderer: Renderer2) {}

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

    overrideGlobalStyles() {
        const customStyleElement = document.getElementById('customStyle') as HTMLStyleElement;
        const customFontFamilyElement = document.getElementById('customFontFamily') as HTMLLinkElement;
    
        if (customStyleElement) {
          customStyleElement.innerHTML = ":root { --ar-root-font-size: 1.05rem; }";
        }
    
        if (customFontFamilyElement) {
          customFontFamilyElement.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        } else {
        }
      }

    ngOnInit() {
        initializeThemeSwitcher();
        initializeBindedContentToggle();

        setTimeout(() => {
            this.removeActiveClass();
        }, 2000);

        setTimeout(() => {
            //this.overrideGlobalStyles();
        }, 7000);

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
