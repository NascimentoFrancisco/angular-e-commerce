import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ShoppingResponse } from '../../interfaces/responses/shopping/shoppingResponse';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) { }

  public getShoppingsByUser(userId: string): Observable<ShoppingResponse[]>{
    return this.http.get<ShoppingResponse[]>(`${environment.BASE_URL}/shopping/?search=${userId}`);
  }

}
