import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputTextComponent } from './default-input-text.component';

describe('DefaultInputTextComponent', () => {
  let component: DefaultInputTextComponent;
  let fixture: ComponentFixture<DefaultInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInputTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
