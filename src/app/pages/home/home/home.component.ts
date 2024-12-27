import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { CategoriesService } from '../../../services/categories/categories.service';
import { CategoryResponse } from '../../../interfaces/responses/categories/categoryResponse';
import { ProductsService } from '../../../services/products/products.service';
import { ProductsResponse } from '../../../interfaces/responses/products/productsResponse';
import { ListProductsComponent } from "../list-products/list-products.component";
import { SpinnerPageInfoComponent } from "../../../shared/spinner-info/spinner-page-info.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ListProductsComponent, SpinnerPageInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public categories?: CategoryResponse[];
  //public productsByCategories: Array<ProductsResponse[]> = [];

  constructor(
    private categoriesService: CategoriesService,
    private proudctsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        if(response){
          this.categories = response;
          //console.log(this.categories);
          /* this.categories.forEach((category) => {
            this.getProductByCategory(category.slug);
          }); */
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  /* public getProductByCategory(category_slug: string){
    if(this.categories){
      this.proudctsService.getProduct(category_slug).subscribe({
        next: (response) => {
          if(response && response.length > 0){
            //console.log(response)
            this.productsByCategories?.push(response);
            console.log(this.productsByCategories);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  } */

}
