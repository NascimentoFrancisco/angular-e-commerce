import { Component, OnInit } from '@angular/core';
import { ShoppingResponse } from '../../interfaces/responses/shopping/shoppingResponse';
import { ProductsResponse } from '../../interfaces/responses/products/productsResponse';
import { AuthService } from '../../services/auth/auth.service';
import { AddressService } from '../../services/address/address.service';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { AddressResponse } from '../../interfaces/responses/address/addressResponse';
import { Router } from '@angular/router';
import { HeaderNotAuthenticatedComponent } from "../../shared/header-not-authenticated/header-not-authenticated.component";
import { CurrencyBrPipe } from '../../utils/pipes/currencybr/currency-br.pipe';
import statesAndTaxesShiipping from '../../interfaces/utils/statesTaxes';
import { NotContentContainerComponent } from "../../shared/not-content-container/not-content-container.component";
import { SpinnerPageInfoComponent } from "../../shared/spinner-info/spinner-page-info.component";
import { ModalService } from '../../services/modal/modal.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [
    HeaderNotAuthenticatedComponent,
    CurrencyBrPipe,
    NotContentContainerComponent,
    SpinnerPageInfoComponent
],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent implements OnInit{
  public shopping?: ShoppingResponse;
  public product?: ProductsResponse;
  public quantityProducts = 0;
  public addressByUser: AddressResponse[] = [];
  public shippingValue = 0;
  public statesAndTaxeByShipping = statesAndTaxesShiipping;
  public AddressRequests = false;
  private indexAddress = 0;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private addressService: AddressService,
    private modalService: ModalService,
    private shoppingService: ShoppingService,
    private snackbarService: SnackbarService,
  ) {}
  
  ngOnInit(): void {
    if(window.history.state){
      const state = window.history.state;
      this.product = state.product;
      this.quantityProducts = state.quantityProducts;
    } else {
      this.router.navigate(["/"]);
    }

    this.getAllAddresByUser();
  }

  public selectAddress(idInputAddress: string): void {
    const inputElement = document.querySelector(`input[value="${idInputAddress}"]`) as HTMLInputElement;
    if(idInputAddress){
      inputElement.checked = true;
      this.indexAddress = Number(inputElement.id);
    }
  }

  public calculateShipping(stateByAddress?: string): number{
    /* Here it is interesting to integrate with a shipping service to calculate the amount 
    paid to send to the requested address. As I am not using this type of service, I will 
    simply calculate for each state in the country, using a percentage. 
    */
    if(stateByAddress){
      let valueShipping = 0;
      let valueBase = Number(this.product!.price) * this.quantityProducts
      
      this.statesAndTaxeByShipping.forEach((state) => {
        if(state.state === stateByAddress){
          valueShipping = valueBase * (state.tax / 100);
        }
      });
      this.shippingValue = valueShipping;
      return valueShipping;
    }

    if(this.addressByUser.length > 0 && !stateByAddress){
      let valueShipping = 0;
      let valueBase = this.product!.price * this.quantityProducts
      
      this.statesAndTaxeByShipping.forEach((state) => {
        if(state.state === this.addressByUser[this.indexAddress].state){
          valueShipping = valueBase * (state.tax / 100);
        }
      });
      this.shippingValue = valueShipping;
      return valueShipping;
    }
    
    return 0;
  }

  private getAllAddresByUser(){
    let userID = this.authService.getInfoAuth("userIDKey");
    if(userID){
      this.addressService.getAllAddressByIdUser(userID).subscribe({
        next: (response) => {
          if(response) {
            this.addressByUser = response;
            this.indexAddress = response.length - 1;
            this.AddressRequests = true
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  public navigateToCreateAddress(){
    this.router.navigate(["address/create-update"], {
      state: { 
        "product": this.product, 
        "quantityProducts": this.quantityProducts, 
        "isInShopping": true 
      }
    })
  }

  public navigateToHome(){
    this.router.navigate(["/"]);
  }

  public handleFinishShopping(){
    this.modalService.openModal(
      `<p>Você realmente deseja finalizar esta compra?</p>
      <p>Caso queira cancelar será possível, mas caso não a cancele a compra ficará em aberto até que o vendedor a cancele.</p>`,
      () => this.createShopping()
    )
  }

  private createShopping(){
    if(this.product){
      const value = (this.product.price * this.quantityProducts) + this.shippingValue
      let shoppingRequest = {
        product: this.product.id,
        quantity_products: this.quantityProducts,
        status: true,
        value: Number(value.toFixed(2)),
        shipping_value: Number(this.shippingValue.toFixed(2)),
        cancelled: false,
        payment_status: false,
        address: this.addressByUser[this.indexAddress].id 
      }

      this.shoppingService.createShopping(shoppingRequest).subscribe({
        next: (response) => {
          if(response){
            console.log(response);
            this.router.navigate(["payment"], {
              state: { "shopping": response }
            });

            this.snackbarService.show(
              "Compra feita com sucesso! Realize o pagamento para finaizar", "success", 5000
            );
          }
        },
        error: (err) => {
          console.log(err);
          this.snackbarService.show(
            "Erro ao fazer compra dese produto!", "error"
          );
        }
      })

    }
    console.log("Comprar!");
  }

}
