// html-loader.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtmlLoaderService {
  constructor(private http: HttpClient) {}

  loadHtml(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}
