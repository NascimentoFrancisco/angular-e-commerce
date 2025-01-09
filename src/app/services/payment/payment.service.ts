import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { PaymentRequest } from '../../interfaces/requests/payment/paymentRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public createPayment(paymentRequest: PaymentRequest){
    return this.http.post(`${environment.BASE_URL}/payment/`, paymentRequest);
  }

}
