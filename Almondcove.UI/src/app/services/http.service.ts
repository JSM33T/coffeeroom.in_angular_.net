import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    fetchFile(url: string): Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl + url);
    }

    // Function to get data from the API
    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
    }

    // Function to post data to the API
    post<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, options);
    }

    // Function to put data to the API
    put<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, options);
    }

    // Function to delete data from the API
    delete<T>(endpoint: string, options?: { headers?: HttpHeaders }): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, options);
    }
}
