import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from '@app/app.component';
import { ArtworkListComponent } from '@components/artwork-list/artwork-list.component';
import { ArtworkDetailComponent } from '@components/artwork-detail/artwork-detail.component';
import { NavOverlaysComponent } from '@components/nav-overlays/nav-overlays.component';;
import { MapComponent } from '@components/map/map.component';
import { InfoDialogComponent } from '@components/info-dialog/info-dialog.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    ArtworkListComponent,
    ArtworkDetailComponent,
    NavOverlaysComponent,
    MapComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InfoDialogComponent]
})
export class AppModule {}
