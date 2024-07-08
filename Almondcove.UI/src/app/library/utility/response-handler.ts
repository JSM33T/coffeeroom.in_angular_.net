import { APIResponse } from '../../models/api-response.model';
import acServerToast from '../../library/modals/server-response-modal';
import { Observable, catchError, of, tap } from 'rxjs';

export function handleResponse(observable: Observable<APIResponse<any>>, showToast: boolean = false): Observable<APIResponse<any>> {
    return observable.pipe(
        tap((response) => {
            if (showToast) {
                acServerToast(response);
            }
        }),
        catchError((error) => {
            if (showToast) {
                acServerToast(error.error);
            }
            return of(error);
        }),
    );
}

