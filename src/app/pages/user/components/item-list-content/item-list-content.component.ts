import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ShoppingResponse } from '../../../../interfaces/responses/shopping/shoppingResponse';
import { ShoppingCartResponse } from '../../../../interfaces/responses/shopping-cart/shoppingCartResponse';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { CurrencyBrPipe } from '../../../../utils/pipes/currencybr/currency-br.pipe';
import { ModalService } from '../../../../services/modal/modal.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ShoppingCartService } from '../../../../services/shopping_cart/shopping-cart.service';
import { ShoppingService } from '../../../../services/shopping/shopping.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  @Output() shoppingUpdateList = new EventEmitter<void>();
  public quantityProducts = 1;
  public totalValue = 0;
  public buttonClicked = false;
  destroyedRef = inject(DestroyRef);
  

  constructor(
    private router: Router,
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
      this.shoppingCartService.removeCatShopping(this.shoppingCart.id).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
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

  /* Shoppings */
  public handleDeleteShoppingCart(){
    this.modalService.openModal(
      "<h2>Atenção!</h2><p>Você realmente deseja <b>cancelar</b> sua compra?</p>",
      () => this.cancelShopping()
    )
  }

  private cancelShopping(){
    this.shoppingService.cancelShopping(this.shopping!.id).pipe(
      takeUntilDestroyed(this.destroyedRef)
    ).subscribe({
      next: (response) => {
        if(response){
          this.shoppingUpdateList.emit();
          this.snackbarService.show("Compra cancelada com sucesso!", "success");
        }
      },
      error: (err) => {
        this.snackbarService.show("Erro ao cancelar compra", "error");
      }
    });
  }

  public navigateToPayment(){
    this.router.navigate(["payment"], {
      state: { shopping: this.shopping }
    });
  }

  public navigateToShopping(){
    this.router.navigate(["shopping"], {
      state: {"product": this.shopping!.product, "quantityProducts": this.shopping!.quantity_products}
    })
  }

  public navigateToDetailShopping(){
    this.router.navigate(["shopping/detail"], {
      state: {"shopping": this.shopping}
    });
  }

}
