import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private loadingBar: LoadingBarService) {}

  start() {
    this.loadingBar.start();
  }

  stop() {
    this.loadingBar.complete();
  }

  increment(value: number) {
    this.loadingBar.increment(value);
  }

  set(value: number) {
    this.loadingBar.set(value);
  }
}
