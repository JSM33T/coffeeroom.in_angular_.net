import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string;

    constructor() {
        // Load token from local storage or other persistent storage
        this.token = localStorage.getItem('token') || '';
        console.log(this.token);
    }

    getToken(): string {
        return this.token;
    }

    setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Other authentication related methods
}
