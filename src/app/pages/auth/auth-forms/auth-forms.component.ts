import { Component, Input } from '@angular/core';
import { HeaderNotAuthenticatedComponent } from "../../../shared/header-not-authenticated/header-not-authenticated.component";
import { DefaultInputTextComponent } from "../../../shared/default-input-text/default-input-text.component";
import { DefaultButtonComponent } from "../../../shared/default-button/default-button.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-auth-forms',
  standalone: true,
  imports: [
    FormsModule,
    HeaderNotAuthenticatedComponent,
    DefaultInputTextComponent,
    DefaultButtonComponent,
    SpinnerComponent
],
  templateUrl: './auth-forms.component.html',
  styleUrl: './auth-forms.component.scss'
})
export class AuthFormsComponent {

  @Input() loginOrChangePassword: boolean = false;// If false, make login
  public buttonStatus = true;
  

  loginFormData = {
    username: "",
    password: "",
  }

  changhePasswordFormData = {
    password1: "",
    password2: "",
  }

  constructor (
    private authService: AuthService,
    private snackBarService: SnackbarService
  ) {}

  public onSubmit(){
    if(this.loginOrChangePassword){
      if(this.changhePasswordFormData.password1 != "" && this.changhePasswordFormData.password2 != ""){
        this.changePassword();
      }
    }else{
      if(this.loginFormData.username !== "" && this.loginFormData.password !== ""){
        this.handleLogin();
      }
    }

  }

  public handleClick(){
    return;
  }

  private handleLogin(){
    let loginRequest = {
      username: this.loginFormData.username,
      password: this.loginFormData.password
    }
    this.buttonStatus = false;
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        if(response){
          console.log(response);
          this.buttonStatus = true;
          this.cleanLoginFormData();
        }
      },
      error: (err) => {
        console.log(err);
        this.buttonStatus = true;
        if(err.status === 401){
          this.handleErrors(err.error.detail, "error");
        } else {
          this.handleErrors(err.error.detail, "error");
        }
      }
    })

  }

  private changePassword(){

  }

  private cleanLoginFormData(){
    this.loginFormData.username = "";
    this.loginFormData.password = "";
  }

  private handleErrors(message: string, type: 'success' | 'error' | 'warning' | 'info'): void{
    this.snackBarService.show(message, type);
  }

}
