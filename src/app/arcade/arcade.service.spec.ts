import { TestBed, inject } from '@angular/core/testing';

import { ArcadeService } from './arcade.service';

describe('ArcadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArcadeService]
    });
  });

  it('should be created', inject([ArcadeService], (service: ArcadeService) => {
    expect(service).toBeTruthy();
  }));
});
