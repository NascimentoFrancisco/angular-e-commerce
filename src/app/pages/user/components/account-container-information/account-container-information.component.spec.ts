import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContainerInformationComponent } from './account-container-information.component';

describe('AccountContainerInformationComponent', () => {
  let component: AccountContainerInformationComponent;
  let fixture: ComponentFixture<AccountContainerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountContainerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountContainerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
