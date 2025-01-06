import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../interfaces/requests/auth/loginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interfaces/responses/auth/loginResponse';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { ChangePasswordRequest } from '../../interfaces/requests/auth/changePasswordRequest';
import { ChangePasswordResponse } from '../../interfaces/responses/auth/changePasswordResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  private userIDKey = 'userIDKey';

  constructor(private http: HttpClient, private router: Router) { }

  public login(loginRequest: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.BASE_URL}/token/`, loginRequest);
  }

  public changePassword(changePasswordRequest: ChangePasswordRequest): Observable<ChangePasswordResponse>{
    return this.http.put<ChangePasswordResponse>(
      `${environment.BASE_URL}/user/change-password/`, changePasswordRequest
    );
  }

  public setAllInfoAuth(accessToken: string, refreshToken: string, user_id: string){
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    localStorage.setItem(this.userIDKey, user_id);
  }

  public setInfoAuth(key: 'accessToken' | 'refreshToken' | 'userIDKey', value: string){
    localStorage.setItem(key, value);
  }

  public getInfoAuth(key: string) {
    return localStorage.getItem(key);
  }

  public refreshToken(){
    let refresh = this.getInfoAuth(this.refreshTokenKey);
    return this.http.post(`${environment.BASE_URL}/token/refresh/`, { refresh })
  }

  public clearAllInfoAuth() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userIDKey);
  }

  public logout() {
    this.clearAllInfoAuth();
    this.router.navigate(['login']);
  }

}
