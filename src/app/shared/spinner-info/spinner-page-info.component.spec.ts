import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPageInfoComponent } from './spinner-page-info.component';

describe('SpinnerPageInfoComponent', () => {
  let component: SpinnerPageInfoComponent;
  let fixture: ComponentFixture<SpinnerPageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerPageInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
