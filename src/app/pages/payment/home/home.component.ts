import { Component, Input, OnInit } from '@angular/core';
import { HeaderNotAuthenticatedComponent } from "../../../shared/header-not-authenticated/header-not-authenticated.component";
import { ShoppingResponse } from '../../../interfaces/responses/shopping/shoppingResponse';
import { CurrencyBrPipe } from '../../../utils/pipes/currencybr/currency-br.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderNotAuthenticatedComponent,
    CurrencyBrPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  @Input() shopping?: ShoppingResponse;

  constructor(private router: Router){}
  
  selectPaymentMethod(method: string): void {
    const inputElement = document.querySelector(`input[value="${method}"]`) as HTMLInputElement;
    if (inputElement) {
      inputElement.checked = true;
    }
  }
  
  ngOnInit(): void {
    if(window.history.state){
      const state = window.history.state
      this.shopping = state.shopping;
    }
  }

  public calculateValueShopping(): number{
    if(this.shopping){
      return this.shopping.product.price * this.shopping.quantity_products
    }
    return 0;
  }

  public navigateToBankSlip(){
    /* let paymentRequest = {
      shopping: this.shopping!.id,
      payment_method: "BKS",
      divided_into: 1,
      value: this.shopping!.product.price,
      total_value: this.shopping!.product.price * this.shopping!.quantity_products,
    } */
   let shopping = this.shopping;
    this.router.navigate(['payment/credit-cart'], {
      state: { shopping }
    });
  }

}
