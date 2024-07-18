import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../../../models/api-response.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { HttpService } from '../../../services/http.service';
import { handleResponse } from '../../../library/utility/response-handler';
import InitTogglePassword from '../../../library/invokers/password-visibility-toggle';
import { HideModal, ShowModal } from '../../../library/modals/bs-helper';
import acServerToast from '../../../library/modals/server-response-modal';

@Component({
    selector: 'app-signup',
    template: `
        <!-- Modal markup -->
        <!-- Modal -->
        <div class="modal fade" id="otpModal" tabindex="-1" role="dialog" data-bs-backdrop="static" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form (ngSubmit)="onOtpSubmit()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">OTP</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="position-relative">
                                <div class="d-flex justify-content-between">
                                    <input id="otp1" name="otp1" [(ngModel)]="otpData.otp1" (keyup)="moveToNext($event, 'otp1', 'otp2')" maxlength="1" class="form-control form-control-lg text-center mx-4 px-2" type="text" required />
                                    <input id="otp2" name="otp2" [(ngModel)]="otpData.otp2" (keyup)="moveToNext($event, 'otp2', 'otp3')" maxlength="1" class="form-control form-control-lg text-center mx-4 px-2" type="text" required />
                                    <input id="otp3" name="otp3" [(ngModel)]="otpData.otp3" (keyup)="moveToNext($event, 'otp3', 'otp4')" maxlength="1" class="form-control form-control-lg text-center mx-4 px-2" type="text" required />
                                    <input id="otp4" name="otp4" [(ngModel)]="otpData.otp4" (keyup)="moveToNext($event, 'otp4')" maxlength="1" class="form-control form-control-lg text-center mx-4 px-2" type="text" required />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer flex-column flex-sm-row">
                            <button type="button" class="btn btn-secondary w-100 w-sm-auto mb-3 mb-sm-0" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary w-100 w-sm-auto ms-sm-3">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="d-lg-flex position-relative h-100">
            <!-- Home button -->
            <a class="text-nav btn btn-icon bg-light border rounded-circle position-absolute top-0 end-0 p-0 mt-3 me-3 mt-sm-4 me-sm-4" routerLink="/" data-bs-toggle="tooltip" data-bs-placement="left" title="Back to home" aria-label="Back to home">
                <i class="ai-home"></i>
            </a>

            <!-- Sign in form -->
            <div class="d-flex flex-column align-items-center w-lg-50 h-100 px-3 px-lg-5 pt-5">
                <div class="w-100 mt-auto" style="max-width: 526px;">
                    <h1>Sign in to Around</h1>
                    <p class="pb-3 mb-3 mb-lg-4">
                        Already have an account?&nbsp;&nbsp;
                        <a routerLink="/auth/login">Login here!</a>
                    </p>
                    <form class="row g-4 needs-validation" (ngSubmit)="onSignupSubmit()" #SignupForm="ngForm">
                        <div class="">
                            <div class="position-relative">
                                <i class="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <input id="username" name="username" [(ngModel)]="formData.username" class="form-control form-control-lg ps-5" type="text" placeholder="Username" required />
                            </div>
                        </div>

                        <div class="">
                            <div class="position-relative">
                                <i class="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <input id="firstname" name="firstname" [(ngModel)]="formData.firstname" class="form-control form-control-lg ps-5" type="text" placeholder="firstname" required />
                            </div>
                        </div>

                        <div class="">
                            <div class="position-relative">
                                <i class="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <input id="lastname" name="lastname" [(ngModel)]="formData.lastname" class="form-control form-control-lg ps-5" type="text" placeholder="lastname" required />
                            </div>
                        </div>

                        <div class="">
                            <div class="position-relative">
                                <i class="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <input id="email" name="email" [(ngModel)]="formData.email" class="form-control form-control-lg ps-5" type="text" placeholder="Your email" required />
                            </div>
                        </div>

                        <div class="">
                            <div class="position-relative">
                                <i class="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <div class="password-toggle">
                                    <input type="password" id="password" name="password" [(ngModel)]="formData.password" class="form-control form-control-lg ps-5" type="password" placeholder="Password" required />
                                    <label class="password-toggle-btn" aria-label="Show/hide password">
                                        <input class="password-toggle-check" type="checkbox" />
                                        <span class="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="position-relative">
                                <i class="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <div class="password-toggle">
                                    <input type="password" id="passwordconfirm" name="password" [(ngModel)]="formData.passwordconfirm" class="form-control form-control-lg ps-5" type="password" placeholder="passwordconfirm" required />
                                    <label class="password-toggle-btn" aria-label="Show/hide password">
                                        <input class="password-toggle-check" type="checkbox" />
                                        <span class="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-lg btn-primary w-100 mb-4" type="submit">Sign in</button>

                        <!-- Sign in with social account -->
                        <!-- <h2 class="h6 text-center pt-3 pt-lg-4 mb-4">Or sign in with your social account</h2>
                        <div class="row row-cols-1 row-cols-sm-2 gy-3">
                            <div class="col">
                                <a class="btn btn-icon btn-outline-secondary btn-google btn-lg w-100" href="#">
                                    <i class="ai-google fs-xl me-2"></i>
                                    Google
                                </a>
                            </div>
                            <div class="col">
                                <a class="btn btn-icon btn-outline-secondary btn-facebook btn-lg w-100" href="#">
                                    <i class="ai-facebook fs-xl me-2"></i>
                                    Facebook
                                </a>
                            </div>
                        </div> -->
                    </form>
                </div>

                <!-- Copyright -->
                <p class="nav w-100 fs-sm pt-5 mt-auto mb-5" style="max-width: 526px;">
                    <span class="text-body-secondary">&copy; All rights reserved. Made by</span>
                    <a class="nav-link d-inline-block p-0 ms-1" href="https://jsm33t.in" target="_blank" rel="noopener">Almondcove</a>
                </p>
            </div>

            <!-- Cover image -->
            <div class="w-50 bg-size-cover bg-repeat-0 bg-position-center" style="background-image: url(assets/images/auth/cover.jpg);"></div>
        </div>
    `,
})
export class SignupComponent implements OnInit {
    constructor(
        private loadingBar: LoadingBarService,
        private httpService: HttpService,
    ) {}
    ngOnInit(): void {
        InitTogglePassword();
        setTimeout(() => {
            ShowModal('otpModal');
        }, 3000);
    }

    loadingBarState: any;
    isLoading = false;
    formData = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordconfirm: '',
    };
    otpData = {
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
    };

    otpSubmitData = {
        email: '',
        otp: '',
    };

    onSignupSubmit(): void {
        this.isLoading = true;

        console.log(this.formData);
        const response$: Observable<APIResponse<any>> = this.httpService.post('api/auth/signup', this.formData);
        handleResponse(response$, false).subscribe({
            next: (response) => {
                this.isLoading = false;
                ShowModal('otpModal');
                const otp1Element = document.getElementById('otp1') as HTMLInputElement;
                if (otp1Element) {
                    otp1Element.focus();
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }

    onOtpSubmit(): void {
        this.isLoading = true;

        this.otpSubmitData.email = this.formData.email;
        this.otpSubmitData.otp = `${this.otpData.otp1}${this.otpData.otp2}${this.otpData.otp3}${this.otpData.otp4}`;

        const response$: Observable<APIResponse<any>> = this.httpService.post('api/auth/verify', this.otpSubmitData);

        handleResponse(response$, true).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.status == 200) {
                    HideModal('otpModal');
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }

    moveToNext(event: KeyboardEvent, currentInput: string, nextInput?: string) {
        const input = event.target as HTMLInputElement;
        if (input.value.length === 1 && nextInput) {
            const nextElement = document.getElementById(nextInput) as HTMLInputElement;
            if (nextElement) {
                nextElement.focus();
            }
        } else if (input.value.length === 1 && !nextInput) {
            input.blur();
        }
    }
}
