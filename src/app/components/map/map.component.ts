import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lng = 24.9415;
  lat = 60.1706;
  zoom = 15;

  @Output()
  markerClick = new EventEmitter<PublicArtWorkConcise>();

  @Input()
  loading = true;

  @Input()
  artworks: PublicArtWorkConcise[] = [];

  constructor() { }

  ngOnInit() {}

  centerArtwork(aw: PublicArtWorkFull) {
    if (aw.location !== null) {
      this.lng = aw.location[0];
      this.lat = aw.location[1];
      this.zoom = 19;
    }
  }

}
