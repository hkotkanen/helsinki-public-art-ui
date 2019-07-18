import { Component, OnInit, Input } from '@angular/core';
import {PublicArtWorkFull} from '@app/interfaces';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.scss']
})
export class ArtworkDetailComponent implements OnInit {

  @Input()
  selectedArtwork: PublicArtWorkFull;

  constructor() { }

  ngOnInit() {
  }

}
