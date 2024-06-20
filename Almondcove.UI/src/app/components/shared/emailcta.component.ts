import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { APIResponse } from '../../models/api-response.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { handleResponse } from '../../library/utility/response-handler';


@Component({
	selector: 'app-component-email',
	template: `
	<div class="input-group">
	<span class="input-group-text text-body-secondary">
                <i class="ai-mail"></i>
              </span>
    <input
      [(ngModel)]="email"
      class="form-control"
      type="text"
      placeholder="Enter your email"
    />
    <button class="btn btn-dark" type="button" (click)="bookCall()">Book a call</button>
	</div>
  `
})
export class EmailBookingComponent {
	email: string = '';

	constructor(private httpService: HttpService) { }


	bookCall(): void {
		const postData = { email: this.email };
		const response$: Observable<APIResponse<any>> = this.httpService.post('api/sample', postData);
		handleResponse(response$).subscribe();
	}

}
