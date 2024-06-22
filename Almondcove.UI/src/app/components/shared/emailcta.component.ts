import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { APIResponse } from '../../models/api-response.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { handleResponse } from '../../library/utility/response-handler';
import acToast from '../../library/modals/notification-modal';
import { Router } from '@angular/router';

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
export class EmailBookingComponent {
    email: string = '';

    constructor(private httpService: HttpService,private router : Router) {}

    bookCall(): void {
        acToast('in the oven', 'in development');
        // const postData = { email: this.email };
        // const response$: Observable<APIResponse<any>> = this.httpService.post('api/sample', postData);
        // handleResponse(response$).subscribe();
    }
    navigateToContact(event: Event): void {
        event.preventDefault();
        this.router.navigate(['/contact']);
      }
}
