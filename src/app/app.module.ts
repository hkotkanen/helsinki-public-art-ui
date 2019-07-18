import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';

import { AppComponent } from '@app/app.component';
import { ArtworkListComponent } from '@components/artwork-list/artwork-list.component';
import { ArtworkDetailComponent } from './components/artwork-detail/artwork-detail.component';

@NgModule({
  declarations: [AppComponent, ArtworkListComponent, ArtworkDetailComponent],
  imports: [BrowserModule, HttpClientModule, MatDividerModule, MatListModule, MatProgressBarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
