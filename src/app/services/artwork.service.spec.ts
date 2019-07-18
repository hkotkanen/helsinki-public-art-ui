import { TestBed } from '@angular/core/testing';

import { ArtworkServiceService } from './artwork.service';

describe('ArtworkServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtworkServiceService = TestBed.get(ArtworkServiceService);
    expect(service).toBeTruthy();
  });
});
