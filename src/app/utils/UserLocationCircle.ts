import * as L from 'leaflet';

export class UserLocationCircle extends L.Circle {
  constructor(latLng: L.LatLngExpression, options?: L.CircleMarkerOptions) {
    super(latLng, options);
  }
}
