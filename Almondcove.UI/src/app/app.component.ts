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
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    constructor(private router: Router) {}

    title = 'almondcoveNg';

    ngOnInit() {
        initializeThemeSwitcher();
        initializeBindedContentToggle();

        this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((event) => {
            InitSmoothScroll();
            InitAnimateOnScroll();
            initializeScrollToTop();
            initParallax();
            //   hideOffcanvas();
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
