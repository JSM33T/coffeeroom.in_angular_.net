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
    templateUrl : './login.component.html'
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
