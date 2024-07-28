import { APIResponse } from '../../core/interfaces/api-response.model';
import acServerToast from '../../library/modals/server-response-modal';
import { Observable, catchError, of, tap } from 'rxjs';
import acToast from '../modals/notification-modal';

export function handleResponse(observable: Observable<APIResponse<any>>, showToast: boolean = false): Observable<APIResponse<any>> {
    return observable.pipe(
        tap((response) => {
            if (showToast) {
                acServerToast(response);
            }
        }),
        catchError((error) => {
           // debugger;
            // if (showToast) {
            //     acServerToast(error.error);
            // }
            // else
            // {
                   
            // }
            acToast("Error","API not reachable : some parts of the app will not work as expected");
            return of(error);
        }),
    );
}
