import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotContentContainerComponent } from './not-content-container.component';

describe('NotContentContainerComponent', () => {
  let component: NotContentContainerComponent;
  let fixture: ComponentFixture<NotContentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotContentContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
