import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <!-- Footer -->
        <footer class="footer">
            <hr />
            <div class="container py-4">
                <div class="row align-items-center py-2 py-sm-3">
                    <div class="col-md-4 order-md-2 mb-4 mb-md-0">
                        <div class="d-flex justify-content-center justify-content-md-end gap-3">
                            <div class="d-flex justify-content-center justify-content-md-start me-md-n2">
                                <a *ngFor="let link of socialLinks" class="btn btn-icon btn-sm btn-secondary rounded-circle mx-2" [ngClass]="link.class" [href]="link.url" target="_blank" [attr.aria-label]="link.label">
                                    <i [ngClass]="link.icon"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 order-md-1">
                        <div class="d-sm-flex text-nowrap justify-content-center justify-content-md-start">
                            <p class="text-body-secondary text-center">&copy; almondcove</p>
                        </div>
                    </div>
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
