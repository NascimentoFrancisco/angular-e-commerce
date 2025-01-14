import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AddressByCep } from '../../interfaces/responses/addressByCep/addressByCep';
import { AddressRequest } from '../../interfaces/requests/address/addressRequest';
import { AddressResponse } from '../../interfaces/responses/address/addressResponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  public getCep(cep: string): Observable<AddressByCep>{
    return this.http.get<AddressByCep>(`${environment.API_CEP}/${cep}/json/`);
  }

  public createAddress(addresRequest: AddressRequest): Observable<AddressResponse>{
    return this.http.post<AddressResponse>(`${environment.BASE_URL}/address/`, addresRequest); 
  }

  public getAllAddressByIdUser(userId: string): Observable<AddressResponse[]>{
    return this.http.get<AddressResponse[]>(`${environment.BASE_URL}/address/?search=${userId}`);
  }

  public updateAddress(addresId: string, addresRequest: AddressRequest): Observable<AddressResponse>{
    return this.http.put<AddressResponse>(
      `${environment.BASE_URL}/address/${addresId}/`, addresRequest
    );
  }

}
