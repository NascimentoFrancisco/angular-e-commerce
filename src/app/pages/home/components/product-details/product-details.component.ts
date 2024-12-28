import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { ProductsResponse } from '../../../../interfaces/responses/products/productsResponse';
import { ProductsService } from '../../../../services/products/products.service';
import { SpinnerPageInfoComponent } from "../../../../shared/spinner-info/spinner-page-info.component";
import { ShortenPipe } from '../../../../utils/pipes/shorten/shorten.pipe';
import { CurrencyBrPipe } from '../../../../utils/pipes/currencybr/currency-br.pipe';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

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

  constructor(
    private route: ActivatedRoute, 
    private productsService: ProductsService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(parms => {
      this.idProduct = parms["id"];
      
      if(this.idProduct){
        this.getProductById(this.idProduct);
      }
      
    })
  }
  
  public getProductById(id: string){
    this.productsService.getProductById(id).subscribe({
      next: (response) => {
        console.log(response);
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

}
