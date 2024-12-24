import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../interfaces/requests/auth/loginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interfaces/responses/auth/loginResponse';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.BASE_URL}/token/`, loginRequest);
  }
}
