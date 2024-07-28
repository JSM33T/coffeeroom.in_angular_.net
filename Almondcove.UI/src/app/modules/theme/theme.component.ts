import { AfterViewInit, Component, OnInit } from '@angular/core';
import Initswiper from '../../library/invokers/swiper';
import setTheme from '../../library/invokers/settheme';

interface Slide {
    imageUrl: string;
    title: string;
    description: string;
    theme: {
        'theme-id': number;
        font: string;
        string: string;
    };
}

@Component({
    selector: 'app-theme',
    template: `
        <!-- Full height slider with scroll support -->
        <div class="vh-100 pt-5 pt-lg-4">
            <div
                class="swiper h-100"
                data-swiper-options='{
                        "direction": "vertical",
                        "mousewheel": {
                        "thresholdDelta": 20
                        }
                    }'
            >
                <div class="swiper-wrapper">
                    <!-- Item -->
                    <!-- swiper.component.html -->

                    <div *ngFor="let slide of slides" class="swiper-slide">
                        <div class="position-relative h-100">
                            <div class="bg-secondary position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block"></div>
                            <div class="d-flex flex-column flex-lg-row align-items-center h-100 position-relative z-2">
                                <div class="position-relative w-100 order-lg-2">
                                    <div class="bg-info position-absolute top-0 end-0 w-100 h-100 d-lg-none"></div>
                                    <img class="d-block position-relative z-2 mx-auto scale-up" [src]="slide.imageUrl" width="748" alt="Image" />
                                </div>
                                <div class="w-100 order-lg-1 px-3 px-lg-4 py-4 pt-lg-0">
                                    <div class="text-center text-sm-start mx-auto" style="max-width: 450px;">
                                        <h2 class="h1 pb-2 pb-sm-0">{{ slide.title }}</h2>
                                        <p class="d-none d-sm-block pb-3 pb-lg-4 mb-1">{{ slide.description }}</p>
                                        <button class="btn btn-md btn-outline-primary w-100 w-md-auto" (click)="setCurrentTheme(slide.theme)" [disabled]="isThemeApplied(slide.theme['theme-id'])">
                                            {{ isThemeApplied(slide.theme['theme-id']) ? 'Applied' : 'Apply' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Scroll for more indicator -->
            <div class="position-fixed start-50 bottom-0 translate-middle-x rounded-4 rounded-bottom-0 bg-light shadow z-5 fs-sm fw-medium text-dark py-2 px-3">Scroll for more</div>
        </div>
    `,
})
export class ThemeComponent implements AfterViewInit, OnInit {
    slides: Slide[] = [
        {
            imageUrl: 'https://around.createx.studio/assets/img/portfolio/slider/01.png',
            title: 'Slate (Default)',
            description: 'Some litt description',
            theme: {
                'theme-id': 1,
                font: '',
                string: '',
            },
        },
        {
            imageUrl: 'https://around.createx.studio/assets/img/portfolio/slider/01.png',
            title: 'An application for a national bank',
            description: 'Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis vel nisl lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed felis.',

            theme: {
                'theme-id': 2,
                font: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
                string: `:root{--ar-primary:#708f87;--ar-primary-rgb:112,143,135;--ar-warning-rgb:204,181,97;--ar-info-rgb:94,135,181;--ar-success-rgb:;--ar-danger-rgb:;--ar-body-font-family:'Playwrite CU',cursive;--ar-root-font-size:1rem;--ar-border-width:1px;--ar-border-radius:0.5rem;--ar-border-radius-sm:calc(var(--ar-border-radius)*1);--ar-link-color:#708f87;--ar-link-hover-color:#57766e;}.btn-primary{--ar-btn-bg:#708f87;--ar-btn-border-color:#708f87;--ar-btn-hover-bg:#57766e;--ar-btn-hover-border-color:#57766e;--ar-btn-active-bg:#57766e;--ar-btn-active-border-color:#57766e;--ar-btn-disabled-bg:#708f87;--ar-btn-disabled-border-color:#708f87;}.btn-warning{--ar-btn-bg:#ccb561;--ar-btn-border-color:#ccb561;--ar-btn-hover-bg:#b39c48;--ar-btn-hover-border-color:#b39c48;--ar-btn-active-bg:#b39c48;--ar-btn-active-border-color:#b39c48;--ar-btn-disabled-bg:#ccb561;--ar-btn-disabled-border-color:#ccb561;}.btn-info{--ar-btn-bg:#5e87b5;--ar-btn-border-color:#5e87b5;--ar-btn-hover-bg:#456e9c;--ar-btn-hover-border-color:#456e9c;--ar-btn-active-bg:#456e9c;--ar-btn-active-border-color:#456e9c;--ar-btn-disabled-bg:#5e87b5;--ar-btn-disabled-border-color:#5e87b5;}.btn-success{--ar-btn-bg:#55b48d;--ar-btn-border-color:#55b48d;--ar-btn-hover-bg:#3c9b74;--ar-btn-hover-border-color:#3c9b74;--ar-btn-active-bg:#3c9b74;--ar-btn-active-border-color:#3c9b74;--ar-btn-disabled-bg:#55b48d;--ar-btn-disabled-border-color:#55b48d;}.btn-danger{--ar-btn-bg:#e15b5b;--ar-btn-border-color:#e15b5b;--ar-btn-hover-bg:#c84242;--ar-btn-hover-border-color:#c84242;--ar-btn-active-bg:#c84242;--ar-btn-active-border-color:#c84242;--ar-btn-disabled-bg:#e15b5b;--ar-btn-disabled-border-color:#e15b5b;}.btn-outline-primary{--ar-btn-color:#708f87;--ar-btn-border-color:#708f87;--ar-btn-hover-bg:#708f87;--ar-btn-hover-border-color:#708f87;--ar-btn-active-bg:#708f87;--ar-btn-active-border-color:#708f87;--ar-btn-disabled-color:#708f87;--ar-btn-disabled-border-color:#708f87;}.btn-outline-warning{--ar-btn-color:#ccb561;--ar-btn-border-color:#ccb561;--ar-btn-hover-bg:#ccb561;--ar-btn-hover-border-color:#ccb561;--ar-btn-active-bg:#ccb561;--ar-btn-active-border-color:#ccb561;--ar-btn-disabled-color:#ccb561;--ar-btn-disabled-border-color:#ccb561;}.btn-outline-info{--ar-btn-color:#5e87b5;--ar-btn-border-color:#5e87b5;--ar-btn-hover-bg:#5e87b5;--ar-btn-hover-border-color:#5e87b5;--ar-btn-active-bg:#5e87b5;--ar-btn-active-border-color:#5e87b5;--ar-btn-disabled-color:#5e87b5;--ar-btn-disabled-border-color:#5e87b5;}.btn-outline-success{--ar-btn-color:#55b48d;--ar-btn-border-color:#55b48d;--ar-btn-hover-bg:#55b48d;--ar-btn-hover-border-color:#55b48d;--ar-btn-active-bg:#55b48d;--ar-btn-active-border-color:#55b48d;--ar-btn-disabled-color:#55b48d;--ar-btn-disabled-border-color:#55b48d;}.btn-outline-danger{--ar-btn-color:#e15b5b;--ar-btn-border-color:#e15b5b;--ar-btn-hover-bg:#e15b5b;--ar-btn-hover-border-color:#e15b5b;--ar-btn-active-bg:#e15b5b;--ar-btn-active-border-color:#e15b5b;--ar-btn-disabled-color:#e15b5b;--ar-btn-disabled-border-color:#e15b5b;}.accordion-button:not(.collapsed)::after{--ar-accordion-btn-active-icon:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='%23708f87'%3e%3cpath%20d='M.5%206.3c.6-.6%201.6-.6%202.3%200l9.3%209.3%209.3-9.3c.6-.6%201.6-.6%202.3%200%20.6.6.6%201.6%200%202.3L13.3%2018.8c-.6.6-1.6.6-2.3%200L.8%208.5c-.9-.8-.9-1.6-.3-2.2z'/%3e%3c/svg%3e");}`,
            },
        },
        {
            imageUrl: 'https://around.createx.studio/assets/img/portfolio/slider/01.png',
            title: 'Lilac',
            description: 'Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis vel nisl lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed felis.',
            theme: {
                'theme-id': 3,
                font: 'https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&display=swap',
                string: `:root{--ar-primary:#8f708f;--ar-primary-rgb:143,112,143;--ar-warning-rgb:#ccb561;--ar-warning-rgb:204,181,97;--ar-info-rgb:#5e87b5;--ar-info-rgb:94,135,181;--ar-success-rgb:;--ar-success-rgb:;--ar-danger-rgb:;--ar-danger-rgb:;--ar-body-font-family:'Inter',sans-serif;--ar-root-font-size:1rem;--ar-border-width:1px;--ar-border-radius:0.5rem;--ar-border-radius-sm:calc(var(--ar-border-radius)*1);--ar-link-color:#8f708f;--ar-link-hover-color:#765776;}.btn-primary{--ar-btn-bg:#8f708f;--ar-btn-border-color:#8f708f;--ar-btn-hover-bg:#765776;--ar-btn-hover-border-color:#765776;--ar-btn-active-bg:#765776;--ar-btn-active-border-color:#765776;--ar-btn-disabled-bg:#8f708f;--ar-btn-disabled-border-color:#8f708f;}.btn-warning{--ar-btn-bg:#ccb561;--ar-btn-border-color:#ccb561;--ar-btn-hover-bg:#b39c48;--ar-btn-hover-border-color:#b39c48;--ar-btn-active-bg:#b39c48;--ar-btn-active-border-color:#b39c48;--ar-btn-disabled-bg:#ccb561;--ar-btn-disabled-border-color:#ccb561;}.btn-info{--ar-btn-bg:#5e87b5;--ar-btn-border-color:#5e87b5;--ar-btn-hover-bg:#456e9c;--ar-btn-hover-border-color:#456e9c;--ar-btn-active-bg:#456e9c;--ar-btn-active-border-color:#456e9c;--ar-btn-disabled-bg:#5e87b5;--ar-btn-disabled-border-color:#5e87b5;}.btn-success{--ar-btn-bg:#55b48d;--ar-btn-border-color:#55b48d;--ar-btn-hover-bg:#3c9b74;--ar-btn-hover-border-color:#3c9b74;--ar-btn-active-bg:#3c9b74;--ar-btn-active-border-color:#3c9b74;--ar-btn-disabled-bg:#55b48d;--ar-btn-disabled-border-color:#55b48d;}.btn-danger{--ar-btn-bg:#e15b5b;--ar-btn-border-color:#e15b5b;--ar-btn-hover-bg:#c84242;--ar-btn-hover-border-color:#c84242;--ar-btn-active-bg:#c84242;--ar-btn-active-border-color:#c84242;--ar-btn-disabled-bg:#e15b5b;--ar-btn-disabled-border-color:#e15b5b;}.btn-outline-primary{--ar-btn-color:#8f708f;--ar-btn-border-color:#8f708f;--ar-btn-hover-bg:#8f708f;--ar-btn-hover-border-color:#8f708f;--ar-btn-active-bg:#8f708f;--ar-btn-active-border-color:#8f708f;--ar-btn-disabled-color:#8f708f;--ar-btn-disabled-border-color:#8f708f;}.btn-outline-warning{--ar-btn-color:#ccb561;--ar-btn-border-color:#ccb561;--ar-btn-hover-bg:#ccb561;--ar-btn-hover-border-color:#ccb561;--ar-btn-active-bg:#ccb561;--ar-btn-active-border-color:#ccb561;--ar-btn-disabled-color:#ccb561;--ar-btn-disabled-border-color:#ccb561;}.btn-outline-info{--ar-btn-color:#5e87b5;--ar-btn-border-color:#5e87b5;--ar-btn-hover-bg:#5e87b5;--ar-btn-hover-border-color:#5e87b5;--ar-btn-active-bg:#5e87b5;--ar-btn-active-border-color:#5e87b5;--ar-btn-disabled-color:#5e87b5;--ar-btn-disabled-border-color:#5e87b5;}.btn-outline-success{--ar-btn-color:#55b48d;--ar-btn-border-color:#55b48d;--ar-btn-hover-bg:#55b48d;--ar-btn-hover-border-color:#55b48d;--ar-btn-active-bg:#55b48d;--ar-btn-active-border-color:#55b48d;--ar-btn-disabled-color:#55b48d;--ar-btn-disabled-border-color:#55b48d;}.btn-outline-danger{--ar-btn-color:#e15b5b;--ar-btn-border-color:#e15b5b;--ar-btn-hover-bg:#e15b5b;--ar-btn-hover-border-color:#e15b5b;--ar-btn-active-bg:#e15b5b;--ar-btn-active-border-color:#e15b5b;--ar-btn-disabled-color:#e15b5b;--ar-btn-disabled-border-color:#e15b5b;}.accordion-button:not(.collapsed)::after{--ar-accordion-btn-active-icon:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='%238f708f'%3e%3cpath%20d='M.5%206.3c.6-.6%201.6-.6%202.3%200l9.3%209.3%209.3-9.3c.6-.6%201.6-.6%202.3%200%20.6.6.6%201.6%200%202.3L13.3%2018.8c-.6.6-1.6.6-2.3%200L.8%208.5c-.9-.8-.9-1.6-.3-2.2z'/%3e%3c/svg%3e")}`,
            },
        },
    ];

    appliedThemeId: number | null = null;

    setCurrentTheme(theme: { 'theme-id': number; font: string; string: string }): void {
        localStorage.setItem('themeData', JSON.stringify(theme));
        this.appliedThemeId = theme['theme-id'];
        setTheme();
    }

    checkAppliedTheme(): void {
        const themeData = localStorage.getItem('themeData');
        if (themeData != null) {
            const theme = JSON.parse(themeData);
            this.appliedThemeId = theme['theme-id'];
        }
    }

    isThemeApplied(themeId: number): boolean {
        return this.appliedThemeId === themeId;
    }

    ngOnInit(): void {
        this.checkAppliedTheme();
        setTheme();
    }
    ngAfterViewInit(): void {
        Initswiper();
    }
}
