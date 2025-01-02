import { Component, Input, OnInit } from '@angular/core';
import { ShoppingResponse } from '../../../../interfaces/responses/shopping/shoppingResponse';
import { ShoppingCartResponse } from '../../../../interfaces/responses/shopping-cart/shoppingCartResponse';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { CurrencyBrPipe } from '../../../../utils/pipes/currencybr/currency-br.pipe';

@Component({
  selector: 'app-item-list-content',
  standalone: true,
  imports: [CurrencyBrPipe],
  templateUrl: './item-list-content.component.html',
  styleUrl: './item-list-content.component.scss',
  providers: [
    CurrencyBrPipe
  ]
})
export class ItemListContentComponent implements OnInit{
  @Input() shopping?: ShoppingResponse;
  @Input() shoppingCart?: ShoppingCartResponse;
  public quantityProducts = 1;
  public totalValue = 0;

  constructor(private snackbarService: SnackbarService) {}
  
  ngOnInit(): void {
    this.totalValue = this.shoppingCart ? this.shoppingCart.product.amount : 0;
  }
  
  public incrementQuantity(){
    if(this.shoppingCart){
      if(this.quantityProducts + 1 > this.shoppingCart.product.amount){
        this.snackbarService.show("Quantidade máxima atingida!", "info");
      } else {
        this.quantityProducts++;
      }
    }
  }

  public decrementQuantity(){
    if(this.shoppingCart){
      if(this.quantityProducts - 1 < 1){
        this.snackbarService.show("Quantidade mínima atingida!", "info");
      } else {
        this.quantityProducts--;
      }
    }
  }

  public calculateValueShopping(): number{
    if(this.shoppingCart){
      return this.shoppingCart.product.price * this.quantityProducts
    }
    return 0;
  }

}
