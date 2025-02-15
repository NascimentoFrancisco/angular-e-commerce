import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { CategoriesService } from '../../../services/categories/categories.service';
import { CategoryResponse } from '../../../interfaces/responses/categories/categoryResponse';
import { ProductsService } from '../../../services/products/products.service';
import { ListProductsComponent } from '../components/list-products/list-products.component'
import { SpinnerPageInfoComponent } from "../../../shared/spinner-info/spinner-page-info.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    ListProductsComponent, 
    SpinnerPageInfoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public categories?: CategoryResponse[];
  public searchValue?: string;
  destroyedRef = inject(DestroyRef);

  constructor(
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  public updateSearchValue(value: string): void {
    this.searchValue = value;
  }

  private getAllCategories(){
    this.categoriesService.getAllCategories().pipe(
      takeUntilDestroyed(this.destroyedRef)
    ).subscribe({
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
