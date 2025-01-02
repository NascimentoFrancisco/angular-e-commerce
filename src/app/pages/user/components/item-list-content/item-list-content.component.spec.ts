import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListContentComponent } from './item-list-content.component';

describe('ItemListContentComponent', () => {
  let component: ItemListContentComponent;
  let fixture: ComponentFixture<ItemListContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
