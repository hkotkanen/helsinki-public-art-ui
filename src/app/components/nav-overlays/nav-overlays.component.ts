import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtworkListComponent } from '@components/artwork-list/artwork-list.component';
import { ArtworkDetailComponent } from '@components/artwork-detail/artwork-detail.component';
import { MatSidenav } from '@angular/material';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';
import { ArtworkService } from '@services/artwork.service';
import { MapComponent } from '@components/map/map.component';

@Component({
  selector: 'app-nav-overlays',
  templateUrl: './nav-overlays.component.html',
  styleUrls: ['./nav-overlays.component.scss']
})
export class NavOverlaysComponent implements OnInit {
  private selectedArtwork: PublicArtWorkFull;
  private artworks: PublicArtWorkConcise[];
  public loading = true;

  @ViewChild('artworkList', { static: true })
  listDrawer: MatSidenav;

  @ViewChild('artworkDetails', { static: true })
  detailsDrawer: MatSidenav;

  @ViewChild(ArtworkListComponent, { static: true })
  private artworkList: ArtworkListComponent;

  @ViewChild(ArtworkDetailComponent, { static: true })
  private artworkDetail: ArtworkDetailComponent;

  @ViewChild(MapComponent, { static: true })
  private map: MapComponent;

  constructor(private artworksService: ArtworkService) {}

  ngOnInit() {
    this.artworksService.getArtWorkList().subscribe(data => {
      this.loading = false;
      this.artworks = data;
      console.log(this.artworks);
    });
  }

  openListDrawer() {
    this.listDrawer.open();
  }

  openDetailsDrawer() {
    this.detailsDrawer.open();
  }

  onArtworkListClick(id: number) {
    this.artworksService.getArtWorkSingle(id).subscribe(data => {
      this.selectedArtwork = data;
      this.map.centerArtwork(data);
      this.listDrawer.close();
      this.detailsDrawer.open();
    });
  }

  onMarkerClick(id: number) {
    this.artworksService.getArtWorkSingle(id).subscribe(data => {
      this.selectedArtwork = data;
      this.map.centerArtwork(data);
      this.listDrawer.close();
      this.detailsDrawer.open();
    });
  }

}
