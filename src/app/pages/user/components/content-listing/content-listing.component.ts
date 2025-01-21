import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ItemListContentComponent } from "../item-list-content/item-list-content.component";
import { UserResponse } from '../../../../interfaces/responses/user/userResponse';
import { ShoppingService } from '../../../../services/shopping/shopping.service';
import { ShoppingResponse } from '../../../../interfaces/responses/shopping/shoppingResponse';
import { NotContentContainerComponent } from "../../../../shared/not-content-container/not-content-container.component";
import { SpinnerPageInfoComponent } from "../../../../shared/spinner-info/spinner-page-info.component";
import { ShoppingCartService } from '../../../../services/shopping_cart/shopping-cart.service';
import { ShoppingCartResponse } from '../../../../interfaces/responses/shopping-cart/shoppingCartResponse';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-content-listing',
  standalone: true,
  imports: [ItemListContentComponent, NotContentContainerComponent, SpinnerPageInfoComponent],
  templateUrl: './content-listing.component.html',
  styleUrl: './content-listing.component.scss'
})
export class ContentListingComponent implements OnInit{
  @Input() title = "";
  @Input() listCartItems = false;
  @Input() listPurchases = false;
  @Input() user!: UserResponse;

  public shoppingsByUser: ShoppingResponse[] = [];
  public shoppingCartByUser: ShoppingCartResponse[] = [];
  public readingDone = false;
  destroyedRef = inject(DestroyRef);

  constructor(
    private shoppingService: ShoppingService,
    private shoppingCartService: ShoppingCartService
  ) {}
  
  ngOnInit(): void {
    if(this.listPurchases){
      this.getAllshoppingByUser();
    } 
    if(this.listCartItems){
      this.getAllShoppingCartsByUser();
    }
  }

  public getAllshoppingByUser(){
    this.shoppingService.getShoppingsByUser(this.user.id).pipe(
      takeUntilDestroyed(this.destroyedRef)
    ).subscribe({
      next: (response) => {
        if(response){
          this.shoppingsByUser = response;
          this.readingDone = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.readingDone = false;
      }
    })
  }

  public getAllShoppingCartsByUser(){
    this.shoppingCartService.getAllShopingCartUser(this.user.id).pipe(
      takeUntilDestroyed(this.destroyedRef)
    ).subscribe({
      next: (cartItems) =>{
        this.shoppingCartService.emitCartUpdate(cartItems);
        this.shoppingCartByUser = cartItems;
        this.readingDone = true;
      },
      error: (err) => {
        console.log(err);
        this.readingDone = true;
      }
    });
  }

}
