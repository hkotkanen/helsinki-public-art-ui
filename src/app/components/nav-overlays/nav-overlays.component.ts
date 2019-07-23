import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ArtworkListComponent } from '@components/artwork-list/artwork-list.component';
import { ArtworkDetailComponent } from '@components/artwork-detail/artwork-detail.component';
import { MatDialog, MatSidenav } from '@angular/material';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';
import { ArtworkService } from '@services/artwork.service';
import { MapComponent } from '@components/map/map.component';
import { InfoDialogComponent } from '@components/info-dialog/info-dialog.component';

import { LatLng } from 'leaflet';

@Component({
  selector: 'app-nav-overlays',
  templateUrl: './nav-overlays.component.html',
  styleUrls: ['./nav-overlays.component.scss']
})
export class NavOverlaysComponent implements OnInit {
  selectedArtwork: PublicArtWorkFull;
  artworks: PublicArtWorkConcise[];
  loading = true;

  @ViewChild('artworkList', { static: true })
  listDrawer: MatSidenav;

  @ViewChild('artworkDetails', { static: true })
  detailsDrawer: MatSidenav;

  @ViewChild(ArtworkListComponent, { static: true })
  private artworkList: ArtworkListComponent;

  @ViewChild(ArtworkDetailComponent, { static: true })
  private artworkDetail: ArtworkDetailComponent;

  @ViewChild(MapComponent, { static: true })
  map: MapComponent;

  @Input()
  userLocation: [number, number];

  constructor(
    private artworksService: ArtworkService,
    private changeDetector: ChangeDetectorRef,
    private infoDialog: MatDialog
    ) {}

  ngOnInit() {
    this.artworksService.getArtWorkList().subscribe(data => {
      this.loading = false;
      this.artworks = data;
    });
  }

  toggleListDrawer() {
    this.listDrawer.toggle();
  }

  toggleDetailsDrawer() {
    this.detailsDrawer.toggle();
  }

  onArtworkListClick(id: number) {
    this.artworksService.getArtWorkSingle(id).subscribe(data => {
      this.selectArtwork(data);
    });
  }

  onMarkerClick(id: number) {
    this.artworksService.getArtWorkSingle(id).subscribe(data => {
      this.selectArtwork(data);
    });
  }

  selectArtwork(aw: PublicArtWorkFull) {
    this.selectedArtwork = aw;
    this.map.centerArtwork(aw);
    this.listDrawer.toggle(false);
    this.detailsDrawer.toggle(true);
    this.changeDetector.detectChanges();
  }

  sortByDistance(location: LatLng) {
    this.artworks.sort((first, second) => {
      const distFirst = location.distanceTo({lat: first.location[1], lng: first.location[0]});
      const distSecond = location.distanceTo({lat: second.location[1], lng: second.location[0]});
      if (distFirst === distSecond) {
        return 0;
      } else {
        return distFirst > distSecond ? 1 : 0;
      }
    });
  }

  openInfoDialog() {
    this.infoDialog.open(InfoDialogComponent, {
      width: '95%'
    });
  }

}
