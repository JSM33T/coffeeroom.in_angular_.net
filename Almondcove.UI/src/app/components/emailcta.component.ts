import { Component } from '@angular/core';

import { Observable, catchError, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { handleResponse } from '../library/utility/response-handler';
import acToast from '../library/modals/notification-modal';
import { APIResponse } from '../models/api-response.model';

@Component({
    selector: 'app-component-email',
    template: `
        <div class="input-group">
            <span class="input-group-text text-body-secondary">
                <i class="ai-mail"></i>
            </span>
            <input [(ngModel)]="email" class="form-control" type="text" placeholder="Enter your email" />
            <button class="btn btn-dark" type="button" (click)="bookCall()">Book a call</button>
        </div>
    `,
})
export class EmailCTA {
    email: string = '';

    constructor(
        private httpServices: HttpService,
        private router: Router,
    ) {}

    bookCall(): void {
        acToast('in the oven', 'in development');
        const postData = { email: this.email };
        const response$: Observable<APIResponse<any>> = this.httpServices.post('api/sample', postData);
        handleResponse(response$).subscribe();
    }
    navigateToContact(event: Event): void {
        event.preventDefault();
        this.router.navigate(['/contact']);
    }
}
