import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PaymentRequest } from '../../../../interfaces/requests/payment/paymentRequest';
import { PaymentService } from '../../../../services/payment/payment.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { HeaderNotAuthenticatedComponent } from "../../../../shared/header-not-authenticated/header-not-authenticated.component";
import { ShoppingResponse } from '../../../../interfaces/responses/shopping/shoppingResponse';
import { CurrencyBrPipe } from '../../../../utils/pipes/currencybr/currency-br.pipe';
import { CircularProgressComponent } from "../../../../shared/circular-progress/circular-progress.component";
import { ModalService } from '../../../../services/modal/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderNotAuthenticatedComponent,
    CurrencyBrPipe,
    CircularProgressComponent
],
  templateUrl: './credit-cart.component.html',
  styleUrl: './credit-cart.component.scss'
})
export class CreditCartComponent implements OnInit{
  
  @Input() shopping?: ShoppingResponse;
  public possibleDivisions: Array<{amount: number, value: number, valueTotal: number}> = [];
  private indexpossibleDivision = 0;
  public creditCardInformationForm: FormGroup;
  public months: string[] = [];
  public years: number[] = [];
  public clicked = false;
  private paymentRequest?: PaymentRequest;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    private snackbarService: SnackbarService,
    private modalService: ModalService
  ) {
    this.creditCardInformationForm = this.fb.group({
      cpf: ['', [Validators.required, this.cpfValidator]],
      creditCardNumber: ['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      creditCartMonth: ['',[Validators.required]],
      creditCartYear: ['',[Validators.required]],
      creditCartCvc: ['',[Validators.required, Validators.pattern('^[0-9]*$')]],
    })
  }

  ngOnInit(): void {

    this.months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 50 }, (_, i) => currentYear + i);

    if(window.history.state){
      const state = window.history.state
      this.shopping = state.shopping;
      this.calculateNumberDivisions();
      this.indexpossibleDivision = this.possibleDivisions.length - 1;
    }
  }

  private cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf){
       return { invalidCpf: true };
    }

    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      return { invalidCpf: true };
    }
    if (/^(\d)\1+$/.test(cleanCpf)) {
      return { invalidCpf: true };
    }
  
    const calculateDigit = (baseCpf: string, factor: number) => {
      let total = 0;
      for (const digit of baseCpf) {
        total += parseInt(digit, 10) * factor--;
      }
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const baseCpf = cleanCpf.slice(0, 9);
    const digit1 = calculateDigit(baseCpf, 10);
    const digit2 = calculateDigit(baseCpf + digit1, 11);

    if (cleanCpf !== baseCpf + digit1 + digit2) {
      return { invalidCpf: true };
    }
    return null;
  }

  public calculateNumberDivisions(){
    /* This method can be implemented with a third-party service to make the payment, 
    in this case I am implementing it statically. */
    if(this.shopping){
      let valueTotal = this.shopping.quantity_products * this.shopping.product.price;
      var percentageTax = 6.5;
      for(let index = 1; index <= 12; index++){
        const value = valueTotal / index;
        if(index !== 1){
          const percentageValue = (value * percentageTax) / 100;
          const result = value + percentageValue;
          this.possibleDivisions.push(
            {amount: index, value: result, valueTotal: index * result}
          );
        }else{
          this.possibleDivisions.push(
            {amount: index, value: value, valueTotal: value}
          );
        }
        percentageTax++;
      }
    }
  }

  public selectPaymentMethod(method: string): void {
    const inputElement = document.querySelector(`input[value="${method}"]`) as HTMLInputElement;
    if (inputElement) {
      inputElement.checked = true;
      this.indexpossibleDivision = Number(method);
    }
  }

  public onSubmit(){
    this.modalService.openModal(
      "Você realmente deseja realizar este pagamento?",
      () => this.makePayment()
    )
  }

  public activeButton(): boolean{
    if(this.creditCardInformationForm.invalid || this.clicked){
      return true;
    }

    if(
      this.creditCardInformationForm.value.cpf === "" || this.creditCardInformationForm.value.creditCardNumber === "" ||
      this.creditCardInformationForm.value.creditCartMonth === "" || this.creditCardInformationForm.value.creditCartYear === "" ||
      this.creditCardInformationForm.value.creditCartCvc === ""
    ){ return true; }
    return false;
  }

  private makePayment(){
    /* Here you can add an integration with a third-party service to then create the payment in the API. */
    if(this.shopping){
      this.paymentRequest = {
        shopping: this.shopping?.id,
        payment_method: "CTC",
        divided_into: this.possibleDivisions[this.indexpossibleDivision].amount,
        value: Number(this.possibleDivisions[this.indexpossibleDivision].value.toFixed(2)),
        total_value: Number(this.possibleDivisions[this.indexpossibleDivision].valueTotal.toFixed(2))
      }
      this.clicked = true;
      this.paymentService.createPayment(this.paymentRequest).subscribe({
        next: (response) => {
          if(response){
            this.snackbarService.show(
              "Pagamento reapizado com sucesso!", "success"
            );
            this.clicked = false;
            this.creditCardInformationForm.reset();
            this.router.navigate(["user"]);
          }
        },
        error: (err) => {
          console.log(err);
          this.snackbarService.show(
            "Erro ao realizar pagamento!", "error"
          );
          this.clicked = false;
        }
      })
      console.log(this.paymentRequest);
    }
  }

}
