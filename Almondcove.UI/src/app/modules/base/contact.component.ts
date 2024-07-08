import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../../library/invokers/smooth-scroll';
import { HttpService } from '../../services/http.service';
import { handleResponse } from '../../library/utility/response-handler';
import { APIResponse } from '../../models/api-response.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-contact',
    template: `
        <section class="container pt-5 pb-lg-2 pb-xl-4 py-xxl-5 my-5">
            <nav aria-label="breadcrumb">
                <ol class="pt-lg-3 pb-lg-4 pb-2 breadcrumb">
                    <li class="breadcrumb-item">
                        <a routerLink="/" data-aos="flip-down" data-aos-duration="500">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page" data-aos="flip-down" data-aos-duration="900">Contact</li>
                </ol>
            </nav>

            <div class="row pb-1 pb-sm-3 pb-lg-4">
                <div class="col-lg-4 pe-xxl-4">
                    <h1 class="display-2" data-aos="flip-up" data-aos-duration="200">Contact</h1>
                    <p class="fs-lg pb-4 mb-0 mb-sm-2" data-aos="flip-up" data-aos-duration="500">Get in touch with us by completing the below form or call us now</p>
                </div>
                <div class="col-lg-8 col-xl-7 offset-xl-1">
                    <form class="row g-4 needs-validation" (ngSubmit)="onSubmit()" #contactForm="ngForm">
                        <div class="col-sm-6">
                            <label class="form-label fs-base" for="name">Name</label>
                            <input class="form-control form-control-lg" type="text" placeholder="Your name" required id="name" [(ngModel)]="formData.name" name="name" #name="ngModel" />
                        </div>

                        <div class="col-sm-6">
                            <label class="form-label fs-base" for="location">Purpose</label>
                            <select class="form-select form-select-lg" id="location" [(ngModel)]="formData.purpose" name="purpose">
                                <option value="general" selected>General</option>
                                <option value="feature">Feature Request</option>
                                <option value="feedback">Feedback/Report</option>
                            </select>
                        </div>

                        <div class="col-sm-12">
                            <label class="form-label fs-base" for="email">Email</label>
                            <input class="form-control form-control-lg" type="email" placeholder="Email address" required [(ngModel)]="formData.mail" name="email" #email="ngModel" />
                        </div>

                        <div class="col-sm-12">
                            <label class="form-label fs-base" for="message">How can we help?</label>
                            <textarea class="form-control form-control-lg" rows="5" placeholder="Enter your message here..." required id="message" [(ngModel)]="formData.messageText" name="message" #message="ngModel"></textarea>
                        </div>

                        <div class="col-sm-12 pt-2">
                            <!-- <button
                                class="btn btn-lg btn-primary"
                                type="submit"
                                [disabled]="contactForm.invalid"
                            > -->
                            <button class="btn btn-lg btn-primary" type="submit">
                                <span *ngIf="isLoading">
                                    <span class="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                    Loading...
                                </span>
                                <span *ngIf="!isLoading">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `,
})
export class ContactComponent implements OnInit, OnDestroy {
    loadingBarState: any;
    isLoading = false;
    formData = {
        name: '',
        purpose: 'general',
        mail: '',
        messageText: '',
    };

    constructor(
        private loadingBar: LoadingBarService,
        private httpService: HttpService,
    ) {}

    ngOnInit(): void {
        this.loadingBarState = this.loadingBar.useRef();

        this.loadingBarState.start();
        this.loadingBarState.complete();
    }

    ngOnDestroy(): void {
        this.loadingBarState.complete();
    }

    onSubmit(): void {
        this.isLoading = true;
        const response$: Observable<APIResponse<any>> = this.httpService.post('api/messages/add', this.formData);
        handleResponse(response$,true).subscribe({
            next: () => {
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }
}
