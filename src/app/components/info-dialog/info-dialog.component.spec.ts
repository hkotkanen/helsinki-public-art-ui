import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBottomSheetComponent } from './info-dialog.component';

describe('InfoBottomSheetComponent', () => {
  let component: InfoBottomSheetComponent;
  let fixture: ComponentFixture<InfoBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
