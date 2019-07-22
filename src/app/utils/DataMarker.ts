import * as L from 'leaflet';
import { PublicArtWorkConcise } from '@app/interfaces';

export class DataMarker extends L.Marker {
  data: PublicArtWorkConcise;

  constructor(latLng: L.LatLngExpression, data: PublicArtWorkConcise, options?: L.MarkerOptions) {
    super(latLng, options);
    this.setData(data);
  }

  getData() {
    return this.data;
  }

  setData(data: PublicArtWorkConcise) {
    this.data = data;
  }
}
