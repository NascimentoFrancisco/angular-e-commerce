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
  private optionPayment = "pix";

  constructor(private router: Router){}
  
  selectPaymentMethod(method: string): void {
    const inputElement = document.querySelector(`input[value="${method}"]`) as HTMLInputElement;
    if (inputElement) {
      inputElement.checked = true;
      this.optionPayment = method;
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
    if(this.optionPayment === "bank_slip"){
      let paymentRequest = {
        shopping: this.shopping!.id,
        payment_method: "BKS",
        divided_into: 1,
        value: this.shopping!.product.price,
        total_value: this.shopping!.product.price * this.shopping!.quantity_products,
      }

      this.router.navigate(['payment/bank-slip'], {
        state: { paymentRequest }
      });

    }

    if(this.optionPayment === "credit_card"){
      let shopping = this.shopping;
       this.router.navigate(['payment/credit-cart'], {
         state: { shopping }
       });
    }
   
    if(this.optionPayment === "pix"){
      let paymentRequest = {
        shopping: this.shopping!.id,
        payment_method: "BKS",
        divided_into: 1,
        value: this.shopping!.product.price,
        total_value: this.shopping!.product.price * this.shopping!.quantity_products,
      }

      this.router.navigate(['payment/pix'], {
        state: { paymentRequest }
      });
    }

  }

}
