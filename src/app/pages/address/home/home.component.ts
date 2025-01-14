import { Component, OnInit } from '@angular/core';
import { HeaderNotAuthenticatedComponent } from "../../../shared/header-not-authenticated/header-not-authenticated.component";
import { ModalService } from '../../../services/modal/modal.service';
import { NotContentContainerComponent } from "../../../shared/not-content-container/not-content-container.component";
import { Router } from '@angular/router';
import { AddressResponse } from '../../../interfaces/responses/address/addressResponse';
import { AuthService } from '../../../services/auth/auth.service';
import { AddressService } from '../../../services/address/address.service';
import { SpinnerPageInfoComponent } from "../../../shared/spinner-info/spinner-page-info.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderNotAuthenticatedComponent, NotContentContainerComponent, SpinnerPageInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public data = true;
  public addressByUser: AddressResponse[] = [];
  public loading = true;
  private addressEditOrDelete?: AddressResponse;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private authService: AuthService,
    private addressService: AddressService,
  ){}

  ngOnInit(): void {

    this.getAllAddressByUser()
  
  }

  private getAllAddressByUser(){
    let userId = this.authService.getInfoAuth("userIDKey");
    if(userId){
      this.addressService.getAllAddressByIdUser(userId).subscribe({
        next: (response) => {
          this.addressByUser = response;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      })
    }
  }

  public handleDeleteAddress(){
    this.modalService.openModal(
      "<p>Tem certeza que deseja excluir este endereço?</p>",
      () => this.deleteAddress("123456")
    )
  }

  private deleteAddress(address_id: string){
    console.log(address_id);
  }

  public navigateToCreateUpdate(addressID?: string){
    this.addressByUser.forEach((address) => {
      if(address.id === addressID){
        this.addressEditOrDelete = address;
      }
    });
    if(this.addressEditOrDelete){
      this.router.navigate(["address/create-update"],{
        state: { "edit" : true, "address": this.addressEditOrDelete}
      });
    }else{
      this.router.navigate(["address/create-update"],{
        state: { "edit" : false}
      })
    }
  }
}
