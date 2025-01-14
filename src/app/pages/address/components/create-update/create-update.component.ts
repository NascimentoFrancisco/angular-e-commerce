import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HeaderNotAuthenticatedComponent } from "../../../../shared/header-not-authenticated/header-not-authenticated.component";
import { AddressService } from '../../../../services/address/address.service';
import { AddressByCep } from '../../../../interfaces/responses/addressByCep/addressByCep';
import { ModalService } from '../../../../services/modal/modal.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { AddressResponse } from '../../../../interfaces/responses/address/addressResponse';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderNotAuthenticatedComponent
  ],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})
export class CreateUpdateComponent implements OnInit{
  public updateAddress = false;
  public addressForEdit?: AddressResponse;
  public addressByCep?: AddressByCep;
  public addressForm: FormGroup;
  public cepValid = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addressService: AddressService,
    private modalService: ModalService,
    private snackbarService: SnackbarService
  ){
    this.addressForm = this.fb.group({
      cep: ['', [Validators.required]],
      city: [{ value: '', disabled: true }, [Validators.required]],
      state: [{ value: '', disabled: true }, [Validators.required]],
      district: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: [0, [Validators.required]],
      complement: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    this.addressForm.get('cep')?.valueChanges.subscribe((cep) => {
    
      if(cep && this.isValidCep(cep) && this.emptyCityState() && !this.addressByCep){
        this.getAddressByCep();
      }
      if(cep && this.isValidCep(cep) && this.addressByCep?.cep !== cep){
        this.getAddressByCep();
      }
      this.addressForm.get('city')?.disable();
    });
  }

  ngOnInit(): void {
    if(window.history.state){
      const state = window.history.state;
      this.addressForEdit = state.address;
      this.updateAddress = state.edit;
    }
    if(this.addressForEdit){
      this.addressForm.patchValue({
        cep: this.addressForEdit.cep,
        city: this.addressForEdit.city,
        state: this.addressForEdit.state,
        district: this.addressForEdit.district,
        street: this.addressForEdit.street,
        number: this.addressForEdit.number,
        complement: this.addressForEdit.complement,
        phoneNumber: this.addressForEdit.phone_number,
      })
    }
  }

  private emptyCityState(): boolean {
    this.addressForm.get('city')?.enable(); 
    return this.addressForm.value.city === "" || this.addressForm.value.state === "";
  }

  public isValidCep(cep: string): boolean {
    return /^[0-9]{8}$/.test(cep);
  }

  public getAddressByCep(){
    let cep = this.addressForm.value.cep;
    if(this.addressForm.value.cep){
      this.addressService.getCep(cep).subscribe({
        // 64980000 83406420 01451000
        next: (response) => {
          if(response.localidade){
            this.addressByCep = response;
          
            this.addressForm.get('city')?.enable();
            this.addressForm.patchValue({
              city: response.localidade,
              state: response.estado,
              street: response?.logradouro ? response.logradouro : this.addressForm.value.street,
              district: response?.bairro ? response.bairro : this.addressForm.value.district,
            });
            this.cepValid = true;
            this.addressForm.get('city')?.disable();
          } else {
            this.cepValid = false;
          }
          
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  public onSubmit(){
    if (this.cepValid && this.addressForm.valid && !this.updateAddress){
      this.createAddress();
    }

    if (this.cepValid && this.addressForm.valid && this.updateAddress && this.addressForEdit){
      this.modalService.openModal(
        "Você realmente deseja alterar este endereço?",
        () => this.editAddress()
      );
    }

  }

  private createAddress(){
    this.addressForm.get('city')?.enable();
    this.addressForm.get('state')?.enable();
    let addresRequest = {
      cep: this.addressForm.value.cep,
      active: true,
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      district: this.addressForm.value.district,
      street: this.addressForm.value.street,
      number: this.addressForm.value.number,
      complement:	this.addressForm.value.complement,
      phone_number: this.addressForm.value.phoneNumber,
    }
    this.addressForm.get('city')?.disable();
    this.addressForm.get('state')?.disable();

    this.addressService.createAddress(addresRequest).subscribe({
      next: (response) => {
        if(response){
          this.snackbarService.show(
            "Endereço cadastrado com sucesso!", "success"
          );
          this.addressForm.reset();
          this.router.navigate(["address"]);
        }
      },
      error: (err) => {
        console.log(err);
        this.snackbarService.show(
          "Erro ao cadastrar endereço!", "error"
        );
      }
    });
  }

  private editAddress(){
    this.addressForm.get('city')?.enable();
    this.addressForm.get('state')?.enable();
    let addresRequest = {
      cep: this.addressForm.value.cep,
      active: true,
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      district: this.addressForm.value.district,
      street: this.addressForm.value.street,
      number: this.addressForm.value.number,
      complement:	this.addressForm.value.complement,
      phone_number: this.addressForm.value.phoneNumber,
    }
    this.addressForm.get('city')?.disable();
    this.addressForm.get('state')?.disable();

    this.addressService.updateAddress( this.addressForEdit!.id, addresRequest).subscribe({
      next: (response) => {
        if(response){
          this.snackbarService.show(
            "Endereço editado com sucesso!", "success"
          );
          this.addressForm.reset();
          this.router.navigate(["address"]);
        }
      },
      error: (err) => {
        console.log(err);
        this.snackbarService.show(
          "Erro ao cadastrar endereço!", "error"
        );
      }
    });
  }

}
