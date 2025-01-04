import { Component, Input, OnInit } from '@angular/core';
import { DefaultInputTextComponent } from "../../../../shared/default-input-text/default-input-text.component";
import { FormsModule } from '@angular/forms';
import { DefaultButtonComponent } from "../../../../shared/default-button/default-button.component";
import { UserUpdateRequest } from '../../../../interfaces/requests/user/userUpdateRequest';
import { UserService } from '../../../../services/user/user.service';
import { HeaderNotAuthenticatedComponent } from "../../../../shared/header-not-authenticated/header-not-authenticated.component";
import { ModalService } from '../../../../services/modal/modal.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [DefaultInputTextComponent, FormsModule, DefaultButtonComponent, HeaderNotAuthenticatedComponent],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent implements OnInit{
  @Input() editOrCad = false; //If it is true it is because it is for editing by a user.
  @Input() isSuperuser = false; //If it is true, it is a super user, that is, a seller.
  @Input() userEdit?: UserUpdateRequest;
  @Input() idUserEdit?: string;

  formData = {
    name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    is_superuser: false
  }

  constructor (
    private userService: UserService,
    private modalService: ModalService,
    private snackbarservice: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formData.is_superuser = this.isSuperuser;
    if(this.editOrCad && this.userEdit){
      this.formData.name = this.userEdit.name;
      this.formData.username = this.userEdit.username;
      this.formData.email = this.userEdit.email;
    }
  }
  
  public onSubmit(){
    if(!this.editOrCad){
      this.createUser();
    } else {
      //this.editUser();
      this.confirmEditUser();
    }
  }

  public handleClick(){
    console.log("Clicou")
  }

  private cleanFormData(){
    this.formData.name = "";
    this.formData.username = "";
    this.formData.email = "";
    this.formData.password1 = "";
    this.formData.password2 = "";
  }

  private createUser(){
    let userCreateRequest = {
      name: this.formData.name,
      username: this.formData.username,
      email: this.formData.email,
      password1: this.formData.password1,
      password2: this.formData.password2,
    }
    this.userService.createUser(userCreateRequest).subscribe({
      next: (response) => {
        if(response){
          console.log(response);
          this.cleanFormData();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private confirmEditUser(){
    this.modalService.openModal(
      `<h3>Atenção!</h3> <p>Ao editar o seu <b>email</b> tenha certeza de que o novo email seja 
      válido e que você tem cessao a ele, e caso altere o <b>Username</b>, lembre-se dememorizá-lo para 
      efetuar login novamente no site.</p>
      <br>
      <span>Dito isso, tem certeza que deseja alterar seus dados de usuário</span>`,
      () => this.editUser()
    )
  }
  private editUser(){
    if(this.idUserEdit !== undefined){
      let userEditRequest = {
        name: this.formData.name,
        username: this.formData.username,
        email: this.formData.email
      }
      this.userService.editUser(this.idUserEdit, userEditRequest).subscribe({
        next: (response) => {
          console.log(response);
          this.formData.name = "";
          this.formData.username = "";
          this.formData.email = "";
          
          this.snackbarservice.show(
            "Informações de usuário deitadas com sucesso!", "success"
          );

          this.router.navigate(["user"])
        },
        error: (err) => {
          if(err.status === 400){
            if(err.error.email){
              this.snackbarservice.show(
                `${err.error.email}`, "error"
              );
            }else if(err.error.username){
              this.snackbarservice.show(
                `${err.error.username}`, "error"
              );
            } else {
              this.snackbarservice.show(
                "Algo de errado, confira os dados e tente novamente", "error"
              );
            }
          } else {
            this.snackbarservice.show(
              "Erro ao editar dados de usuário!", "error"
            );
          }
        }
      })
    }
  }

}
