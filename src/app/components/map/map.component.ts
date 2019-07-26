import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';
import { LatLng, latLng, tileLayer, Map, icon, Popup, Point } from 'leaflet';

import { DataMarker } from 'src/app/utils/DataMarker';
import { UserLocationCircle } from 'src/app/utils/UserLocationCircle';

interface Dictionary<T> {
  [Key: number]: T;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      tileLayer(
        'https://tiles.hel.ninja/styles/hel-osm-bright/{z}/{x}/{y}.png',
        {
          maxZoom: 20,
          attribution: 'Data: OpenStreetMap contributors, Tiles: City of Helsinki'
        }
      )
    ],
    zoom: 14,
    center: latLng(60.1765, 24.94)
  };

  private markers: Dictionary<DataMarker> = {};
  private userLocationMarker: UserLocationCircle;
  private map: Map;

  @Output()
  userLocationReceived = new EventEmitter<LatLng>();

  @Output()
  markerClick = new EventEmitter<number>();

  @Input()
  set artworks(artworkList: PublicArtWorkConcise[]) {
    if (!artworkList) {
      return;
    }

    const markerOpts = {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    };

    artworkList.forEach(artwork => {
      const markerTemporary = new DataMarker({lat: artwork.location[1], lng: artwork.location[0]}, artwork, markerOpts);
      const popupTemporary: Popup = new Popup({offset: new Point(0, -34)});
      popupTemporary.setContent(artwork.name);
      markerTemporary
        .on('click', (event) => this.markerClicked(event))
        .addTo(this.map)
        .bindPopup(popupTemporary);
      this.markers[artwork.id] = markerTemporary;
    });
  }

  constructor() { }

  ngOnInit() {}

  onMapReady(map: Map) {
    this.map = map;
  }

  selectArtwork(aw: PublicArtWorkFull) {
    this.map.flyTo({lat: aw.location[1], lng: aw.location[0]});
    if ((this.markers[aw.id] !== null) && !this.markers[aw.id].isPopupOpen()) {
      this.markers[aw.id].openPopup();
    }
  }

  markerClicked(e) {
    this.markerClick.emit(e.target.data.id);
  }

  locateUser() {
    navigator.geolocation.getCurrentPosition(
    response => this.onLocationFound(response.coords),
    error => this.onLocationError(error),
    {timeout: 1000 * 60, enableHighAccuracy: true, maximumAge: 1000 * 60 * 60}
    );
  }

  onLocationFound(coords) {
    const pos: LatLng = new LatLng(coords.latitude, coords.longitude);
    const radius = coords.accuracy / 2;
    if (!this.userLocationMarker) {
      this.userLocationMarker = new UserLocationCircle(pos, {radius: radius}).addTo(this.map);
      new UserLocationCircle(pos, {radius: 1}).addTo(this.map);
    }
    this.map.panTo(pos);
    this.userLocationReceived.emit(pos);
  }

  onLocationError(e) {
    alert(`Failed getting location: ${e.message}`);
  }
}
