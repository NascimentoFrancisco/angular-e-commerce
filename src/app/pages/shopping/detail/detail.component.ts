import { Component, OnInit } from '@angular/core';
import { ShoppingResponse } from '../../../interfaces/responses/shopping/shoppingResponse';
import { HeaderNotAuthenticatedComponent } from "../../../shared/header-not-authenticated/header-not-authenticated.component";
import { ShortenPipe } from '../../../utils/pipes/shorten/shorten.pipe';
import { CurrencyBrPipe } from '../../../utils/pipes/currencybr/currency-br.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    HeaderNotAuthenticatedComponent,
    ShortenPipe,
    CurrencyBrPipe,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
  public shopping?: ShoppingResponse;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(window.history.state){
      const state = window.history.state
      this.shopping = state.shopping;
    } else{
      this.router.navigate(["/"]);
    }
  }

}
