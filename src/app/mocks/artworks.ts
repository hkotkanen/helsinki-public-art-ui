import { PublicArtWorkConcise, PublicArtWorkFull, ApiResponse, ApiObject } from '@app/interfaces';

export const mockArtworkListApiObject: ApiObject = {
  id: 1,
  name: {
    fi: 'Testi',
    sv: 'Testi',
    en: 'Testi'
  },
  street_address: {
    fi: 'Osoite',
    sv: 'Osoite',
    en: 'Osoite',
  },
  location: {type: 'Point', coordinates: [24.1, 60.1]}
};

export const mockArtworkListApiResponse: ApiResponse = {
  count: 2,
  next: 'http://example.com/api/search/?q=test&page=2',
  previous: null,
  results: [mockArtworkListApiObject]
};

export const mockArtworkConcise: PublicArtWorkConcise = {
  id: 1,
  name: 'Testi',
  location: [24.1, 60.1],
  streetAddress: 'Osoite'
};

export const mockArtworkFull: PublicArtWorkFull = {
  id: 1,
  name: 'Testi',
  municipality: 'Helsinki',
  description: 'Tämä on testi.',
  location: [24.1, 60.1],
  streetAddress: 'Osoite',
  pictureUrl: 'http://example.com/image.jpg',
  pictureCaption: null,
  pictureEntranceUrl: null,
  streetViewEntranceUrl: null,
  shortDescription: null
};

export const mockArtworkSingleApiResponse = {
  'id': 1,
  'name': { 'fi': 'Testi' },
  'municipality': {'id': '1', 'division': 1, 'name': {'fi': 'Helsinki'}},
  'description': {'fi': 'Tämä on testi.'},
  'location': {'coordinates': [24.1, 60.1]},
  'street_address': {'fi': 'Osoite'},
  'picture_url': 'http://example.com/image.jpg',
  'picture_entrance_url': null,
  'streetview_entrance_url': null
};
