import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PaymentService } from '../../../../services/payment/payment.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { HeaderNotAuthenticatedComponent } from "../../../../shared/header-not-authenticated/header-not-authenticated.component";
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-pix',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    QRCodeModule,
    HeaderNotAuthenticatedComponent
  ],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.scss'
})
export class PixComponent implements OnInit{
  @Input() paymentRequest?: PaymentRequest;
  public generated = false;
  public cpfForm: FormGroup;
  public valuDatPix?: string;
  public clicked = false;

  constructor(
    private fb: FormBuilder,
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

  public onSubmit(){
    if(this.cpfForm.valid){
      console.log(this.cpfForm.value.cpf);
      this.generatePixQRCode();
    }
  }

  private generatePixQRCode(){
    //Here a QR Code will be generated simulating a connection with an API that is PIX.
    /* Here you can include the external payment service. Since this application does not 
    have such a service, I will just generate a random QRCode.*/
    if(this.cpfForm.valid){
      this.valuDatPix = "fdshfdsfsahfjffjhsafkjkfsakfshfjshdjhhfsdfjdsakfjasfsajfkash.fdshfdsfsahfjffjhsafkjkfsakfshfjshdjhhfsdfjdsakfjasfsajfkash.fdshfdsfsahfjffjhsafkjkfsakfshfjshdjhhfsdfjdsakfjasfsajfkash"
    }
  }

  public copyToClipboard(){
    if(this.valuDatPix){
      navigator.clipboard.writeText(this.valuDatPix).then(() => {
        this.snackbarService.show(
          "Pix copiado com sucesso!", "success"
        )
      });
    }
  }

}
