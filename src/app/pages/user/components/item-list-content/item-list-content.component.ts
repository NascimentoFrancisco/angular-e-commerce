import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingResponse } from '../../../../interfaces/responses/shopping/shoppingResponse';
import { ShoppingCartResponse } from '../../../../interfaces/responses/shopping-cart/shoppingCartResponse';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { CurrencyBrPipe } from '../../../../utils/pipes/currencybr/currency-br.pipe';
import { ModalService } from '../../../../services/modal/modal.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ShoppingCartService } from '../../../../services/shopping_cart/shopping-cart.service';
import { ShoppingService } from '../../../../services/shopping/shopping.service';

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
  @Output() shoppingCartDeleted = new EventEmitter<void>();
  public quantityProducts = 1;
  public totalValue = 0;
  public buttonClicked = false;

  constructor(
    private snackbarService: SnackbarService,
    private modalService: ModalService,
    private shoppingCartService: ShoppingCartService,
    private shoppingService: ShoppingService,
  ) {}
  
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

  public confirmDeleteShoppingCart(){
    if(this.shoppingCart){
      this.modalService.openModal(
        `Você realemnte deseja excluir <b>${this.shoppingCart.product.name}</> do seu carrinho de compras?`,
        this.buttonClicked ? () => {} : () => this.deleteShoppingCart()
      )
    }
  }

  private deleteShoppingCart(){
    if(this.shoppingCart){
      this.buttonClicked = true;
      this.shoppingCartService.removeCatShopping(this.shoppingCart.id).subscribe({
        next: () => {
          this.buttonClicked = false;
          this.shoppingCartDeleted.emit();
          this.snackbarService.show("Produto removido do carrinho com sucesso!", "success");
        },
        error: (err) => {
          if(err.status === 400){
            this.buttonClicked = false;
            this.snackbarService.show(
              err.error["detail"], "error"
            );
          } else{
            this.buttonClicked = false;
            this.snackbarService.show(
              "Erro ao remover produto do carrinho!", "error"
            );
          }
        }
      })
    }
  }

  /* Shippings */

}
