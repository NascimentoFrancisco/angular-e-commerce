import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNotAuthenticatedComponent } from './header-not-authenticated.component';

describe('HeaderNotAuthenticatedComponent', () => {
  let component: HeaderNotAuthenticatedComponent;
  let fixture: ComponentFixture<HeaderNotAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNotAuthenticatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderNotAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
