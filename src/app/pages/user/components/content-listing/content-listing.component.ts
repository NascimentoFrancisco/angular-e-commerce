import { Component, Input, OnInit } from '@angular/core';
import { ItemListContentComponent } from "../item-list-content/item-list-content.component";

@Component({
  selector: 'app-content-listing',
  standalone: true,
  imports: [ItemListContentComponent],
  templateUrl: './content-listing.component.html',
  styleUrl: './content-listing.component.scss'
})
export class ContentListingComponent implements OnInit{
  @Input() title = "";
  
  ngOnInit(): void {
    
  }

}
