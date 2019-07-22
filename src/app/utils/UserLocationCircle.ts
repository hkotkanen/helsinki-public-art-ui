import * as L from 'leaflet';

export class UserLocationCircle extends L.CircleMarker {
  constructor(latLng: L.LatLngExpression, options?: L.CircleMarkerOptions) {
    super(latLng, options);
  }
}
