import { APIResponse } from '../../models/api-response.model';
import acServerToast from '../../library/modals/server-response-modal';
import { Observable, catchError, of, tap } from 'rxjs';

export function handleResponse(observable: Observable<APIResponse<any>>): Observable<APIResponse<any>> {
    return observable.pipe(
        tap((response) => acServerToast(response)),
        catchError((error) => {
            acServerToast(error.error);
            return of(error);
        }),
    );
}
