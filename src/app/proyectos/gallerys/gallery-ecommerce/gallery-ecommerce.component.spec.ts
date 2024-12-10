import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryEcommerceComponent } from './gallery-ecommerce.component';

describe('GalleryEcommerceComponent', () => {
  let component: GalleryEcommerceComponent;
  let fixture: ComponentFixture<GalleryEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryEcommerceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
