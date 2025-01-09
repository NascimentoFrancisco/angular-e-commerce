import { Component, Input, OnInit } from '@angular/core';
import { HeaderNotAuthenticatedComponent } from "../../../shared/header-not-authenticated/header-not-authenticated.component";
import { DefaultInputTextComponent } from "../../../shared/default-input-text/default-input-text.component";
import { DefaultButtonComponent } from "../../../shared/default-button/default-button.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { ChangePasswordRequest } from '../../../interfaces/requests/auth/changePasswordRequest';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal/modal.service';

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
export class AuthFormsComponent implements OnInit{

  @Input() loginOrChangePassword: boolean = false;// If false, make login
  public buttonStatus = true;
  

  loginFormData = {
    username: "",
    password: "",
  }

  changePasswordFormData = {
    password1: "",
    password2: "",
  }

  constructor (
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    if(window.history.state.loginOrChangePassword){
      const state = window.history.state
      this.loginOrChangePassword = state
    }
  }

  public onSubmit(){
    if(this.loginOrChangePassword){
      if(this.changePasswordFormData.password1 != "" && this.changePasswordFormData.password2 != ""){
        this.modalService.openModal(
          `<h2>Atenção!</h2><p>Ao mudar sua senha tenha certeza de que memorizou a nova senha para conseguir 
          efetuar login novamente.</p>
          <span>Você tem certeza que deseja alterar sua senha?</span>`,
          () => this.changePassword()
        )
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
          this.router.navigate(["/"]);
          this.handleSnackBarMesssage("Seja bem vindo!", "success");
          this.authService.setAllInfoAuth(response.access, response.refresh, response.user_id);
        }
      },
      error: (err) => {
        this.buttonStatus = true;
        if(err.status === 401){
          this.handleSnackBarMesssage(err.error.detail, "error");
        } else {
          this.handleSnackBarMesssage(err.error.detail, "error");
        }
      }
    })

  }

  private changePassword(){
    console.log(this.changePasswordFormData.password1)
    let changePasswordRequest: ChangePasswordRequest = {
      password: this.changePasswordFormData.password1,
      password2: this.changePasswordFormData.password2
    }

    this.authService.changePassword(changePasswordRequest).subscribe({
      next: (response) => {
        if(response){
          this.changePasswordFormData.password1 = "";
          this.changePasswordFormData.password2 = "";
          this.handleSnackBarMesssage(response.detail, 'success');
          this.router.navigate(["user/"])
        }
        console.log(response);
      },
      error: (err) => {
        if(err.status === 400){
          if(err.error.password){
            this.handleSnackBarMesssage(err.error.password, "error");
          }
          if(err.error.password2){
            this.handleSnackBarMesssage(err.error.password2, "error");
          }
        } else {
          console.log(err)
          this.handleSnackBarMesssage("Erro ao alterar senha!", "error");
        }
      }
    });

  }

  private cleanLoginFormData(){
    this.loginFormData.username = "";
    this.loginFormData.password = "";
  }

  private handleSnackBarMesssage(message: string, type: 'success' | 'error' | 'warning' | 'info'): void{
    this.snackBarService.show(message, type, 5000);
  }

}
