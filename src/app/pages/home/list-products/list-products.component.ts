import { Component, Input, OnInit } from '@angular/core';
import { CategoryResponse } from '../../../interfaces/responses/categories/categoryResponse';
import { ProductsResponse } from '../../../interfaces/responses/products/productsResponse';
import { ProductsService } from '../../../services/products/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShortenPipe } from '../../../utils/pipes/shorten/shorten.pipe';
import { CurrencyBrPipe } from "../../../utils/pipes/currencybr/currency-br.pipe";
import { SpinnerPageInfoComponent } from "../../../shared/spinner-info/spinner-page-info.component";

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, ShortenPipe, CurrencyBrPipe, SpinnerPageInfoComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  providers: [ShortenPipe, CurrencyPipe]
})
export class ListProductsComponent implements OnInit{
  @Input() categories?: CategoryResponse[];
  @Input() category?: string;
  @Input() name?: string;
  //public productsByCategories: Array<ProductsResponse[]> = [];
  public productsByCategories: Array<{ category: string, producs: Array<ProductsResponse> }> = [];

  constructor(private proudctsService: ProductsService) {}

  ngOnInit(): void {
    if(this.categories){
      this.categories.forEach((category) => {
        this.getProductByCategory(category.slug, category.title);
      });
    }
  }
  
  public getProductByCategory(categorySlug: string, categoryTitle:string){
    if(this.categories){
      this.proudctsService.getProduct(categorySlug).subscribe({
        next: (response) => {
          if(response && response.length > 0){
            //this.productsByCategorie.push(response);
            this.productsByCategories.push(
              {
                category: categoryTitle,
                producs: response
              }
            )
          }
          console.log(this.productsByCategories);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
