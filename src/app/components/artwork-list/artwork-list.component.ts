import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';

import { ArtworkDetailComponent } from '@components/artwork-detail/artwork-detail.component';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {
  @Output()
  artworkListClick = new EventEmitter<number>();

  @Input()
  artworks: PublicArtWorkConcise[];

  @Input()
  loading = false;

  @ViewChild(ArtworkDetailComponent, { static: true })
  private details: ArtworkDetailComponent;

  constructor() {}

  ngOnInit() {}
}
