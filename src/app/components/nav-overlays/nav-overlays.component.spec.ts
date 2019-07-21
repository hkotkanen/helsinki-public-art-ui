import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOverlaysComponent } from './nav-overlays.component';

describe('NavOverlaysComponent', () => {
  let component: NavOverlaysComponent;
  let fixture: ComponentFixture<NavOverlaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavOverlaysComponent ]
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
