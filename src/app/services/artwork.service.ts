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
  // private artworkList: PublicArtWorkConcise[] = null;

  constructor(private http: HttpClient) {}

  getArtworkList(): Observable<PublicArtWorkConcise[]> {
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

  getArtworkSingle(id: number): Observable<PublicArtWorkFull> {
    return this.http.get(`${this.apiRootUrl}/${id}/${environment.singleUnitApiParams}`).pipe(
      map(response => {

        // Investigate "connections" parameter which might hold interesting things
        let artist = null;
        let published = null;
        let copyright = null;
        const connections = response['connections'];
        if (connections) {
          for (const metadata of connections) {
            const metadata_name = metadata['name']['fi'];
            if (metadata_name.toLowerCase().indexOf('tekijä') >= 0) {
              artist = metadata_name;
            } else if (metadata_name.toLowerCase().indexOf('julkistettu') >= 0) {
              published = metadata_name;
            } else if (metadata_name.indexOf('©') >= 0) {
              copyright = metadata_name;
            }
          }
        }

        return {
          id: response['id'],
          name: response['name']['fi'],
          streetAddress: response['street_address'] ? response['street_address']['fi'] : null,
          location: response['location'] ? response['location']['coordinates'] : null,
          pictureUrl: response['picture_url'] ? response['picture_url'] : null,
          pictureEntranceUrl: response['picture_entrance_url'] ? response['picture_entrance_url'] : null,
          streetViewEntranceUrl: response['streetview_entrance_url'] ? response['streetview_entrance_url'] : null,
          description: response['description'] ? response['description']['fi'] : '',
          shortDescription: null,
          pictureCaption: response['picture_caption'] ? response['picture_caption']['fi'] : null,
          municipality: response['municipality'] ? response['municipality']['name']['fi'] : null,
          author: artist ? artist : null,
          published_year: published ? published : null,
          copyright: copyright ? copyright : null
        };
      })
    );
  }
}
