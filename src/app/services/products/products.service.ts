import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../interfaces/responses/products/productsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProduct(category_slug: string): Observable<ProductsResponse[]>{
    return this.http.get<ProductsResponse[]>(
      `${environment.BASE_URL}/products/?search=${category_slug}`
    );
  }

  public getProductById(idProduct: string): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(
      `${environment.BASE_URL}/products/${idProduct}/`
    );
  }

}
