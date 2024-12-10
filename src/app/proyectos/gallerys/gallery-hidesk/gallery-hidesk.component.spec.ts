import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryHideskComponent } from './gallery-hidesk.component';

describe('GalleryHideskComponent', () => {
  let component: GalleryHideskComponent;
  let fixture: ComponentFixture<GalleryHideskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryHideskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryHideskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
