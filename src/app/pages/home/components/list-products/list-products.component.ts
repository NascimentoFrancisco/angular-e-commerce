import { Component, DestroyRef, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoryResponse } from '../../../../interfaces/responses/categories/categoryResponse'
import { ProductsResponse } from '../../../../interfaces/responses/products/productsResponse';
import { ProductsService } from '../../../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../../../utils/pipes/shorten/shorten.pipe';
import { CurrencyBrPipe } from "../../../../utils/pipes/currencybr/currency-br.pipe";
import { SpinnerPageInfoComponent } from "../../../../shared/spinner-info/spinner-page-info.component";
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule, 
    ShortenPipe, 
    CurrencyBrPipe, 
    SpinnerPageInfoComponent
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  providers: [ShortenPipe]
})
export class ListProductsComponent implements OnInit, OnChanges{
  @Input() categories?: CategoryResponse[];
  @Input() category?: string;
  @Input() searchValue? = "";
  @Input() name?: string;
  public productsByCategories: Array<{ category: string, producs: Array<ProductsResponse> }> = [];
  public productsBySearchValue: Array<{ category: string, producs: Array<ProductsResponse> }> = [];
  destroyedRef = inject(DestroyRef);

  constructor(
    private proudctsService: ProductsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    if(this.categories){
      this.categories.forEach((category) => {
        this.getProductByCategory(category.slug, category.title);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue'] && this.searchValue) {
      this.getProductsBySearchValue();
    }
    
  }
  
  public getProductByCategory(categorySlug: string, categoryTitle:string){
    if(this.categories){
      this.proudctsService.getProduct(categorySlug).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
        next: (response) => {
          if(response && response.length > 0){
            this.productsByCategories.push(
              {
                category: categoryTitle,
                producs: response
              }
            );
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  private getProductsBySearchValue(){
    if(this.searchValue){
      this.proudctsService.getProduct(this.searchValue).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
        next: (response) => {
          if(response && response.length > 0){
            this.productsBySearchValue.push(
              {
                category: this.searchValue!,
                producs: response
              }
            );
          } else {
            this.snackbarService.show(
              `Nenhum resultado na busca por "${this.searchValue}"`, "info", 4000
            )
          }
        },
        error: (err) => {
          console.log(err);
          this.snackbarService.show(
            "Erro fazer pesquisa", "error"
          )
        }
      })
    }
  }

  public navigateToDetail(id: string){
    this.router.navigate(["product-detail", id]);
  }

}
