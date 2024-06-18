import { TestBed } from '@angular/core/testing';

import { LoadingbarService } from './loadingbar.service';

describe('LoadingbarService', () => {
  let service: LoadingbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
