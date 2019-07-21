import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { PublicArtWorkConcise, PublicArtWorkFull, ApiResponse } from '@app/interfaces';
import { environment } from '@envs/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private apiRootUrl = `${environment.apiRootUrl}`;
  private artworkList: PublicArtWorkConcise[] = null;

  constructor(private http: HttpClient) {}

  getArtWorkList(): Observable<PublicArtWorkConcise[]> {
    return this.http.get<ApiResponse>(`${this.apiRootUrl}${environment.listApiParams}`).pipe(
      map(response => {
        return response.results.map(artwork => {
          return {
            id: artwork.id,
            name: artwork.name.fi,
            streetAddress: artwork.street_address ? artwork.street_address.fi : null,
            location: artwork.location ? artwork.location.coordinates : null
          };
        }).filter(artwork => {
          return artwork.location !== null;
        });
      })
    );
  }

  getArtWorkSingle(id: number): Observable<PublicArtWorkFull> {
    return this.http.get(`${this.apiRootUrl}/${id}/${environment.singleUnitApiParams}`).pipe(
      map(response => {
        return {
          id: response['id'],
          name: response['name']['fi'],
          streetAddress: response['street_address'] ? response['street_address']['fi'] : null,
          location: response['location'] ? response['location']['coordinates'] : null,
          pictureUrl: response['picture_url'],
          pictureEntranceUrl: response['picture_entrance_url'],
          streetViewEntranceUrl: response['streetview_entrance_url'],
          description: response['description'] ? response['description']['fi'] : null,
          shortDescription: null,
          pictureCaption: response['picture_caption'] ? response['picture_caption']['fi'] : null,
          municipality: response['municipality'] ? response['municipality']['name']['fi'] : null
        };
      })
    );
  }
}
