import { Component, Input, OnInit } from '@angular/core';
import { HeaderNotAuthenticatedComponent } from "../../../../shared/header-not-authenticated/header-not-authenticated.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import { PaymentService } from '../../../../services/payment/payment.service';
import { PaymentRequest } from '../../../../interfaces/requests/payment/paymentRequest';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-bank-slip',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderNotAuthenticatedComponent
  ],
  templateUrl: './bank-slip.component.html',
  styleUrl: './bank-slip.component.scss'
})
export class BankSlipComponent implements OnInit{
  @Input() paymentRequest?: PaymentRequest;
  public generated = false;
  public cpfForm: FormGroup;

  public pdfSrc: SafeResourceUrl | null = null; 
  public pdfBlob?: Blob;
  
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private paymentService: PaymentService,
    private snackbarService: SnackbarService
  ) {
    this.cpfForm = this.fb.group({
      cpf: ['', [Validators.required, this.cpfValidator]],
    })
  }

  ngOnInit(): void {
    if(window.history.state){
      const state = window.history.state
      this.paymentRequest = state.paymentRequest as PaymentRequest;
      console.log(this.paymentRequest)
    }
  }
  
  private cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;

    if (!cpf) return { invalidCpf: true };

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

    if (cleanCpf !== baseCpf + digit1 + digit2) return { invalidCpf: true };
    return null;
  }

  public onSubmit(){
    if(this.cpfForm.valid){
      console.log(this.cpfForm.value.cpf);
      this.generateSlip();
    }
  }

  private generateSlip(){
    /* Here you can add an integration with an external service to generate a boleto. 
    Since I'm not using any of these services in this project, I'll just create a 
    payment in the backend API and display any PDF.*/
    this.generatePDF()

    //Now I'll just create a payment in the backend API and display any PDF.
    if (this.paymentRequest){
      this.paymentService.createPayment(this.paymentRequest).subscribe({
        next: (response) => {
          if(response){
            this.snackbarService.show(
              "Compra paga com sucesso!", "success"
            );
          }
        },
        error: (err) => {
          if(err){
            this.snackbarService.show(
              "Erro ao realizar pagamento", "error"
            );
          }
        }
      })
    }
  }

  private generatePDF() {
    if (this.cpfForm.valid) {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const margin = 10;

      // Título do boleto
      pdf.setFontSize(16);
      pdf.text('Boleto Bancário', margin, 20);

      const pdfBlob = new Blob([pdf.output('blob')], {type: "application/pdf"})
      this.pdfBlob = pdfBlob;
      const objectUrl = URL.createObjectURL(pdfBlob);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
    }
  }

}
