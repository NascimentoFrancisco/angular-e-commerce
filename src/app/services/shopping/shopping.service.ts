import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ShoppingResponse } from '../../interfaces/responses/shopping/shoppingResponse';
import { ShoppingRequest } from '../../interfaces/requests/shopping/shoppingRequest';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) { }

  public createShopping(shopingRequest: ShoppingRequest): Observable<ShoppingResponse>{
    return this.http.post<ShoppingResponse>(`${environment.BASE_URL}/shopping/`, shopingRequest);
  }

  public getShoppingsByUser(userId: string): Observable<ShoppingResponse[]>{
    return this.http.get<ShoppingResponse[]>(`${environment.BASE_URL}/shopping/?search=${userId}`);
  }

  public cancelShopping(idShopping: string){
    return this.http.patch(
      `${environment.BASE_URL}/shopping/${idShopping}/`,
      { cancelled: true }
    )
  }
}
