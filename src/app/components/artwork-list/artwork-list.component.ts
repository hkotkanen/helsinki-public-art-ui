import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';

import { ArtworkService } from '@services/artwork.service';
import { ArtworkDetailComponent } from '@components/artwork-detail/artwork-detail.component';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {
  isXSmallScreen: boolean;
  breakPointObserverSub: Subscription;

  @Input()
  artworks: PublicArtWorkConcise[];

  @ViewChild(ArtworkDetailComponent, { static: true })
  private details: ArtworkDetailComponent;

  private selectedArtwork: PublicArtWorkFull;
  public loading = true;

  constructor(private artworksService: ArtworkService, private breakpointObserver: BreakpointObserver) {
    this.breakPointObserverSub = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map(result => result.matches))
      .subscribe(isXSmallScreen => (this.isXSmallScreen = isXSmallScreen));
  }

  ngOnInit() {
    this.artworksService.getArtWorkList().subscribe(data => {
      this.loading = false;
      this.artworks = data;
    });
  }

  showDetails(aw: PublicArtWorkConcise) {
    this.artworksService.getArtWorkSingle(aw.id).subscribe(data => {
      console.log(data);
      this.selectedArtwork = data;
    });
  }
}
