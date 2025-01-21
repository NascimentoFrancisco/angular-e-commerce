import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsResponse } from '../../../../interfaces/responses/products/productsResponse';
import { ProductsService } from '../../../../services/products/products.service';
import { SpinnerPageInfoComponent } from "../../../../shared/spinner-info/spinner-page-info.component";
import { ShortenPipe } from '../../../../utils/pipes/shorten/shorten.pipe';
import { CurrencyBrPipe } from '../../../../utils/pipes/currencybr/currency-br.pipe';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { ShoppingCartService } from '../../../../services/shopping_cart/shopping-cart.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ShoppingCartResponse } from '../../../../interfaces/responses/shopping-cart/shoppingCartResponse';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HeaderComponent, 
    SpinnerPageInfoComponent, 
    ShortenPipe,
    CurrencyBrPipe,
],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [
    ShortenPipe,
    CurrencyBrPipe,
  ]
})
export class ProductDetailsComponent implements OnInit{
  public product?: ProductsResponse;
  public idProduct?: string;
  public quantityProducts = 1;
  public isAuthenticated = false;
  public allShoppingCartByUser: ShoppingCartResponse[] = [];
  public shoppingCartByUser?: ShoppingCartResponse | null;
  destroyedRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private productsService: ProductsService,
    private snackbarService: SnackbarService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(parms => {
      this.idProduct = parms["id"];
      
      if(this.idProduct){
        this.getProductById(this.idProduct);
        let userId = this.authService.getInfoAuth("userIDKey");
        if (userId){
          this.shoppingCartService.getAllShopingCartUser(userId!).pipe(
            takeUntilDestroyed(this.destroyedRef)
          ).subscribe({
            next: (response) => {
              if(response){
                response.forEach((shopp) => {
                  if(shopp.product.id === this.idProduct){
                    this.shoppingCartByUser = shopp;
                  }
                });
              }
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
      
    });

    if(this.authService.getInfoAuth("accessToken")){
      this.isAuthenticated = true;
    }
  }
  
  public getProductById(id: string){
    this.productsService.getProductById(id).subscribe({
      next: (response) => {
        if(response){
          this.product = response;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public incrementQuantity(){
    if(this.product){
      if(this.quantityProducts + 1 > this.product.amount){
        this.snackbarService.show("Quantidade máxima atingida!", "info");
      } else {
        this.quantityProducts++;
      }
    }
  }

  public decrementQuantity(){
    if(this.product){
      if(this.quantityProducts - 1 < 1){
        this.snackbarService.show("Quantidade mínima atingida!", "info");
      } else {
        this.quantityProducts--;
      }
    }
  }

  public calculateValueShopping(): number{
    if(this.product){
      return this.product?.price * this.quantityProducts
    }
    return 0;
  }

  public addCartShopping(){
    if(this.isAuthenticated){
      let userId = this.authService.getInfoAuth("userIDKey");
      let data = { product: this.idProduct!, status: true };
      this.shoppingCartService.createCatShopping(data).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
        next: () => {
          this.shoppingCartService.getAllShopingCartUser(userId!).pipe(
            takeUntilDestroyed(this.destroyedRef)
          ).subscribe((cartItems) => {
            this.shoppingCartService.emitCartUpdate(cartItems);
            cartItems.forEach((shopp) => {
              if(shopp.product.id === this.idProduct){
                this.shoppingCartByUser = shopp;
              }
            });
            this.snackbarService.show("Produto adicionado no carrinho com sucesso!", "success");
          })
        },
        error: (err) => {
          if(err.status === 400){
            this.snackbarService.show(
              err.error["detail"], "error"
            );
          } else{
            this.snackbarService.show(
              "Erro ao adicionar produto no carrinho!", "error"
            );
          }
        }     
      })
    } else {
      this.snackbarService.show(
        "Faça login para poder adicionar o o produto em seu carrinho!", "info"
      )
      this.router.navigate(["login"]);
    }
  }

  public removeCartShopping(){
    let userId = this.authService.getInfoAuth("userIDKey");
    if(this.isAuthenticated && this.shoppingCartByUser){
      this.shoppingCartService.removeCatShopping(this.shoppingCartByUser.id).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
        next: () => {
          this.shoppingCartService.getAllShopingCartUser(userId!).subscribe((cartItems) => {
            this.shoppingCartService.emitCartUpdate(cartItems);
            this.shoppingCartByUser = null;
            this.snackbarService.show("Produto removido do carrinho com sucesso!", "success");
          })
        },
        error: (err) => {
          if(err.status === 400){
            this.snackbarService.show(
              err.error["detail"], "error"
            );
          } else{
            this.snackbarService.show(
              "Erro ao remover produto do carrinho!", "error"
            );
          }
        }
      })
    }

  }

  public getAllShoppingCartsByUser(){
    if(this.isAuthenticated){
      let userId = this.authService.getInfoAuth("userIDKey");
      this.shoppingCartService.getAllShopingCartUser(userId!).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe((cartItems) => {
        this.shoppingCartService.emitCartUpdate(cartItems);
      })
    }
  }

  public navigateToShopping(){
    this.router.navigate(["shopping"], {
      state: { "product" : this.product, "quantityProducts": this.quantityProducts }
    });
  }
}
