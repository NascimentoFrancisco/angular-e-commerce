import { Component, Input, OnInit } from '@angular/core';
import { DefaultInputTextComponent } from "../../../../shared/default-input-text/default-input-text.component";
import { FormsModule } from '@angular/forms';
import { DefaultButtonComponent } from "../../../../shared/default-button/default-button.component";
import { userUpdateRequest } from '../../../../interfaces/requests/user/userUpdateRequest';
import { UserService } from '../../../../services/user/user.service';
import { HeaderNotAuthenticatedComponent } from "../../../../shared/header-not-authenticated/header-not-authenticated.component";

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
  @Input() userEdit?: userUpdateRequest;

  formData = {
    name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    is_superuser: false
  }

  constructor (private userService: UserService) {}

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
      this.editUser();
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

  private editUser(){
    let userEditRequest = {
      name: this.formData.name,
      username: this.formData.username,
      email: this.formData.email
    }
  }

}
