import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArtworkService } from './artwork.service';
import { environment } from '@envs/environment';
import { mockArtworkListApiResponse, mockArtworkConcise, mockArtworkFull, mockArtworkSingleApiResponse } from '@mocks/artworks';

describe('ArtworkService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ArtworkService = TestBed.get(ArtworkService);
    expect(service).toBeTruthy();
  });

  it('should fetch list of artworks', () => {
    const service: ArtworkService = TestBed.get(ArtworkService);
    service
      .getArtworkList()
      .subscribe(artworkList => expect(artworkList).toEqual([mockArtworkConcise]));

    const expectedUrl = `${environment.apiRootUrl}${environment.listApiParams}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockArtworkListApiResponse);
  });

  it('should be able to fetch an individual artwork', () => {
    const mockArtworkId = 1;
    const service: ArtworkService = TestBed.get(ArtworkService);
    service
      .getArtworkSingle(mockArtworkId)
      .subscribe(artworkSingle => expect(artworkSingle).toEqual(mockArtworkFull));

    const expectedUrl = `${environment.apiRootUrl}/${mockArtworkId}/${environment.singleUnitApiParams}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockArtworkSingleApiResponse);
  });
});
