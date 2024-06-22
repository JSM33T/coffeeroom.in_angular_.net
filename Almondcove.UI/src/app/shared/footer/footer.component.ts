import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <footer class="footer bg-dark pb-3 pt-sm-3 py-md-4 py-lg-5 mt-5" data-bs-theme="dark">
            <div class="container pb-4 pt-5">
                <div class="d-md-flex align-items-center justify-content-between pb-1 pb-md-0 mb-4 mb-md-5">
                    <nav class="nav justify-content-center justify-content-md-start pb-sm-2 pb-md-0 mb-4 mb-md-0 ms-md-n3">
                        <a *ngFor="let link of navLinks" class="nav-link py-1 px-0 mx-3" [routerLink]="link.url">
                            {{ link.name }}
                        </a>
                    </nav>
                    <div class="d-flex justify-content-center justify-content-md-start me-md-n2">
                        <a *ngFor="let link of socialLinks" class="btn btn-icon btn-sm btn-secondary rounded-circle mx-2" [ngClass]="link.class" [href]="link.url" target="_blank" [attr.aria-label]="link.label">
                            <i [ngClass]="link.icon"></i>
                        </a>
                    </div>
                </div>
                <div class="d-md-flex align-items-center justify-content-between text-center text-md-start">
                    <a class="nav-link d-inline-block text-body-secondary fs-sm text-decoration-none order-md-2 py-1 px-0 mb-3 mb-md-0" routerLink="/">Privacy policy</a>
                    <p class="nav fs-sm order-md-1 mb-0">
                        <span class="text-body-secondary">&copy; almondcove.in</span>
                    </p>
                </div>
            </div>
        </footer>
    `,
})
export class FooterComponent {
    navLinks = [
        { name: 'Home', url: '/' },
        { name: 'Faq', url: '/faq' },
        { name: 'Contact', url: '/contact' },
        { name: 'Attributions', url: '#' },
    ];
    socialLinks = [
        {
            class: 'btn-instagram',
            label: 'Instagram',
            icon: 'ai-instagram',
            url: 'https://instagram.com/jsm33t',
        },
        {
            class: 'btn-facebook',
            label: 'Facebook',
            icon: 'ai-facebook',
            url: 'https://facebook.com/jsm33t',
        },
        { class: 'btn-x', label: 'X', icon: 'ai-x', url: 'https://x.com' },
        {
            class: 'btn-linkedin',
            label: 'LinkedIn',
            icon: 'ai-linkedin',
            url: 'https://linkedin.com',
        },
    ];
}
