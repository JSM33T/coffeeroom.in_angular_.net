import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../../../core/interfaces/api-response.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { HttpService } from '../../../core/services/http.service';
import { handleResponse } from '../../../library/utility/response-handler';
import InitTogglePassword from '../../../library/invokers/password-visibility-toggle';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-login',
    template: `
        <div class="d-lg-flex position-relative h-100">
            <!-- Home button -->
            <a class="text-nav btn btn-icon bg-light border rounded-circle position-absolute top-0 end-0 p-0 mt-3 me-3 mt-sm-4 me-sm-4" routerLink="/" data-bs-toggle="tooltip" data-bs-placement="left" title="Back to home" aria-label="Back to home">
                <i class="ai-home"></i>
            </a>

            <!-- Sign in form -->
            <div class="d-flex flex-column align-items-center w-lg-50 h-100 px-3 px-lg-5 pt-5">
                <div class="w-100 mt-auto" style="max-width: 526px;">
                    <h1>Sign in to Almondcove</h1>
                    <p class="pb-3 mb-3 mb-lg-4">
                        Don't have an account yet?&nbsp;&nbsp;
                        <a routerLink="/auth/signup">SignUp here!</a>
                    </p>

                    <form class="row g-4 needs-validation" (ngSubmit)="onSubmit()" #loginForm="ngForm">
                        <div class="pb-3 mb-3">
                            <div class="position-relative">
                                <i class="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <input id="username" name="username" [(ngModel)]="formData.username" class="form-control form-control-lg ps-5" type="text" placeholder="Username" required />
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="position-relative">
                                <i class="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <div class="password-toggle">
                                    <input type="password" id="password" name="password" [(ngModel)]="formData.password" class="form-control form-control-lg ps-5" type="password" placeholder="Password" required autocomplete="true"/>
                                    <label class="password-toggle-btn" aria-label="Show/hide password">
                                        <input class="password-toggle-check" type="checkbox" />
                                        <span class="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-lg btn-primary w-100 mb-4" type="submit">Sign in</button>
                        <div id="g_id_onload" data-client_id="" data-context="signin" data-ux_mode="popup" data-auto_select="true" data-itp_support="true"></div>

                        <div class="g_id_signin" data-type="icon" data-shape="circle" data-theme="filled_blue" data-text="signin_with" data-size="large"></div>

                        <div id="g_id_onload" data-client_id="881148390473-rodjtppcckgpft8guo2bkttnlcg5gmb2.apps.googleusercontent.com" data-context="signin" data-ux_mode="popup" data-itp_support="true" data-callback="handleOauthResponse"></div>

                        <div class="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="outline" data-text="signin_with" data-size="large" data-logo_alignment="left"></div>

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
export class LoginComponent implements OnInit {
    constructor(private router: Router,private loadingBar: LoadingBarService, private httpService: HttpService,private userService : UserService ) {}
    ngOnInit(): void {
        InitTogglePassword();
    }

    loadingBarState: any;
    isLoading = false;

    formData = {
        username: '',
        password: '',
    };

    onSubmit(): void {
        this.isLoading = true;
        console.log(this.formData);
        const response$: Observable<APIResponse<any>> = this.httpService.post('api/auth/login', this.formData);
        handleResponse(response$, true).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.status == 200) {
                    localStorage.setItem('token', response.data.token);
                    debugger;
                    this.userService.loadUserDataFromToken();
                    this.router.navigate(['/']);
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }
}
