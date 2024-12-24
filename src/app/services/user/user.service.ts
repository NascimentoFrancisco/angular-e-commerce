import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateRequest } from '../../interfaces/requests/user/userCreateRequest';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  constructor(private http: HttpClient) { }

  public createUser(userCreateRequest: UserCreateRequest){
    return this.http.post(`${environment.BASE_URL}/user/`, userCreateRequest);
  }

}
