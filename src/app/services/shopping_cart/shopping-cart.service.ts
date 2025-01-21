import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ShoppingCartResponse } from '../../interfaces/responses/shopping-cart/shoppingCartResponse';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartUpdated = new Subject<ShoppingCartResponse[]>();

  constructor(private http: HttpClient) {}

  public createCatShopping(data: { product: string, status: boolean}){
    return this.http.post(`${environment.BASE_URL}/shopping-cart/`, data);
  }

  public getAllShopingCartUser(userId: string): Observable<ShoppingCartResponse[]>{
    return this.http.get<ShoppingCartResponse[]>(
      `${environment.BASE_URL}/shopping-cart/?search=${userId}`
    );
  }

  public removeCatShopping(cartShoppingId: string){
    return this.http.delete(`${environment.BASE_URL}/shopping-cart/${cartShoppingId}/`);
  }

  emitCartUpdate(cartItems: ShoppingCartResponse[]): void {
    this.cartUpdated.next(cartItems);
  }

  getCartUpdates(): Observable<ShoppingCartResponse[]> {
    return this.cartUpdated.asObservable();
  }

}
