import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateRequest } from '../../interfaces/requests/user/userCreateRequest';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../interfaces/responses/user/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  constructor(private http: HttpClient) { }

  public createUser(userCreateRequest: UserCreateRequest){
    return this.http.post(`${environment.BASE_URL}/user/`, userCreateRequest);
  }

  public getUser(userId: string):Observable<UserResponse>{
    return this.http.get<UserResponse>(`${environment.BASE_URL}/user/${userId}/`);
  }

}
