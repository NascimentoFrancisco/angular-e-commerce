import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-list-content',
  standalone: true,
  imports: [],
  templateUrl: './item-list-content.component.html',
  styleUrl: './item-list-content.component.scss'
})
export class ItemListContentComponent {
  @Input() listCartItems = false;
  @Input() listPurchases = false;

}
