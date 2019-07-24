import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavOverlaysComponent } from './nav-overlays.component';
import { ArtworkService } from '@services/artwork.service';
import { PublicArtWorkConcise, PublicArtWorkFull } from '@app/interfaces';
import { mockArtworkConcise } from '@mocks/artworks';
import { Observable, of } from 'rxjs';


@Component({ selector: 'app-map', template: '' })
class MapStubComponent {
  @Input()
  artworks: PublicArtWorkConcise[];
}

@Component({ selector: 'app-artwork-detail', template: '' })
class ArtworkDetailStubComponent {
  @Input()
  selectedArtwork: PublicArtWorkFull;
}

@Component({ selector: 'app-artwork-list', template: '' })
class ArtworkListStubComponent {
  @Input()
  artworks: PublicArtWorkConcise[];
  @Input()
  loading: boolean;
}

describe('NavOverlaysComponent', () => {
  let component: NavOverlaysComponent;
  let fixture: ComponentFixture<NavOverlaysComponent>;
  let artworkServiceSpy: jasmine.SpyObj<ArtworkService>;

  beforeEach(async(() => {
    artworkServiceSpy = jasmine.createSpyObj('ArtworkService', {getArtworkList: of([mockArtworkConcise])});
    TestBed.configureTestingModule({
      declarations: [NavOverlaysComponent, ArtworkDetailStubComponent, ArtworkListStubComponent, MapStubComponent],
      imports: [MatDialogModule, MatIconModule, MatDividerModule, MatToolbarModule, MatSidenavModule, NoopAnimationsModule],
      providers: [{provide: ArtworkService, useValue: artworkServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavOverlaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
