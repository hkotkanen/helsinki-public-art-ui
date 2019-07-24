export interface Municipality {
  id: string;
  division: number;
  name: string;
}

export interface PointGeometry {
  type: string;
  coordinates: [number, number];
}

export interface ApiResponse {
  count: number;
  next: string;
  previous: string;
  results: ApiObject[];
}

export interface ApiObject {
  id: number;
  name: {
    fi: string;
    sv: string;
    en: string;
  };
  street_address: {
    fi: string;
    sv: string;
    en: string;
  };
  location: PointGeometry;
}

export interface PublicArtWorkConcise {
  id: number;
  name: string;
  location?: [number, number];
  streetAddress?: string;
}

export interface PublicArtWorkFull {
  id: number;
  name: string;
  municipality: string;
  description: string;

  location?: [number, number];
  streetAddress?: string;
  pictureUrl?: string;
  pictureEntranceUrl?: string;
  streetViewEntranceUrl?: string;
  shortDescription?: string;
  pictureCaption?: string;
}
