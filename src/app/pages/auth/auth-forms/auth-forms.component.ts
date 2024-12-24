import { Component, Input } from '@angular/core';
import { HeaderNotAuthenticatedComponent } from "../../../shared/header-not-authenticated/header-not-authenticated.component";
import { DefaultInputTextComponent } from "../../../shared/default-input-text/default-input-text.component";
import { DefaultButtonComponent } from "../../../shared/default-button/default-button.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-auth-forms',
  standalone: true,
  imports: [
    FormsModule,
    HeaderNotAuthenticatedComponent, 
    DefaultInputTextComponent, 
    DefaultButtonComponent
  ],
  templateUrl: './auth-forms.component.html',
  styleUrl: './auth-forms.component.scss'
})
export class AuthFormsComponent {

  @Input() loginOrChangePassword: boolean = false;// If false, make login

  loginFormData = {
    username: "",
    password: "",
  }

  changhePasswordFormData = {
    password1: "",
    password2: "",
  }

  constructor (private authService: AuthService) {}

  public onSubmit(){
    if(this.loginOrChangePassword){
      this.changePassword();
    }else{
      this.handleLogin();
    }

  }

  public handleClick(){
    console.log("Clicou!")
  }

  private handleLogin(){
    let loginRequest = {
      username: this.loginFormData.username,
      password: this.loginFormData.password
    }
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        if(response){
          console.log(response);
          this.cleanLoginFormData();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  private changePassword(){

  }

  private cleanLoginFormData(){
    this.loginFormData.username = "";
    this.loginFormData.password = "";
  }

}
