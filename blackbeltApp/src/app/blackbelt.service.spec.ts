import { TestBed, inject } from '@angular/core/testing';

import { BlackbeltService } from './blackbelt.service';

describe('BlackbeltService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlackbeltService]
    });
  });

  it('should be created', inject([BlackbeltService], (service: BlackbeltService) => {
    expect(service).toBeTruthy();
  }));
});
