import { TestBed } from '@angular/core/testing';

import { HtmlLoaderService } from './html-loader.service';

describe('HtmlLoaderService', () => {
  let service: HtmlLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
