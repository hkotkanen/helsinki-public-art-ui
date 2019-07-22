import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';
import { latLng, tileLayer, Map, icon } from 'leaflet';

import { DataMarker } from 'src/app/utils/DataMarker';
import { UserLocationCircle } from 'src/app/utils/UserLocationCircle';

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
    zoom: 15,
    center: latLng(60.1631, 24.9414)
  };

  private markers: DataMarker[] = [];
  private map: Map;

  @Output()
  userLocationReceived = new EventEmitter<[number, number]>();

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
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    };

    artworkList.forEach(artwork => {
      const markerTemporary = new DataMarker({lat: artwork.location[1], lng: artwork.location[0]}, artwork, markerOpts);
      markerTemporary.on('click', (event) => this.markerClicked(event));
      markerTemporary.addTo(this.map);
      this.markers.push(markerTemporary);
    });
  }

  constructor() { }

  ngOnInit() {}

  onMapReady(map: Map) {
    this.map = map;
  }

  centerArtwork(aw: PublicArtWorkFull) {
    if (aw.location !== null) {
      this.map.panTo({lat: aw.location[1], lng: aw.location[0]});
    }
  }

  markerClicked(e) {
    console.log(e.target.data.id);
    this.markerClick.emit(e.target.data.id);
  }

  locateUser() {
    this.map.locate({setView: true});
    this.map.on('locationfound', (event) => this.onLocationFound(event));
  }

  onLocationFound(e) {
    const radius = e.accuracy / 2;
    // L.marker(e.latlng).addTo(this.map).bindPopup("You are within " + radius + " meters from this point").openPopup();
    new UserLocationCircle(e.latlng, {radius: radius}).addTo(this.map);
    new UserLocationCircle(e.latlng, {radius: 1}).addTo(this.map);
    this.userLocationReceived.emit(e.latlng);
  }

}
