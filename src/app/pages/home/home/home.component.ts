import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { CategoriesService } from '../../../services/categories/categories.service';
import { CategoryResponse } from '../../../interfaces/responses/categories/categoryResponse';
import { ProductsService } from '../../../services/products/products.service';
import { ProductsResponse } from '../../../interfaces/responses/products/productsResponse';
import { ListProductsComponent } from '../components/list-products/list-products.component'
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
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
