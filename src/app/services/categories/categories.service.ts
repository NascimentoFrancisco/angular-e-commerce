import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../interfaces/responses/categories/categoryResponse';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<CategoryResponse[]>{
    return this.http.get<CategoryResponse[]>(`${environment.BASE_URL}/categories/`);
  }

}
