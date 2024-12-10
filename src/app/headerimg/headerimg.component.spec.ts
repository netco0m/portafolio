import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderimgComponent } from './headerimg.component';

describe('HeaderimgComponent', () => {
  let component: HeaderimgComponent;
  let fixture: ComponentFixture<HeaderimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderimgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
