import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatProgressBarModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';

import { ArtworkListComponent } from './artwork-list.component';

describe('ArtworkListComponent', () => {
  let component: ArtworkListComponent;
  let fixture: ComponentFixture<ArtworkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworkListComponent],
      imports: [MatDividerModule, MatProgressBarModule, MatSidenavModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
