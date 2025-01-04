import { Component, Input, OnInit } from '@angular/core';
import { FormUserComponent } from "../form-user/form-user.component";
import { UserUpdateRequest } from '../../../../interfaces/requests/user/userUpdateRequest';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserService } from '../../../../services/user/user.service';
import { SpinnerPageInfoComponent } from "../../../../shared/spinner-info/spinner-page-info.component";

@Component({
  selector: 'app-create-update-user',
  standalone: true,
  imports: [FormUserComponent, SpinnerPageInfoComponent],
  templateUrl: './create-update-user.component.html',
  styleUrl: './create-update-user.component.scss'
})
export class CreateUpdateUserComponent implements OnInit {
  public editOrCreate = false;
  public isSuperuser = false;
  public loading = true;
  public userId = "";
  public userEdit: UserUpdateRequest = {
    name: "",
    email: "",
    username: ""
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ){}

  ngOnInit(): void {
    if(this.authService.getInfoAuth("accessToken")){
      /* If user is authenticated is a edit  operation */
      this.editOrCreate = true
      this.getUserById();
    } else{
      this.loading = false;
    }
  }

  private getUserById(){
    let userId = this.authService.getInfoAuth("userIDKey")
    this.userService.getUser(userId!).subscribe({
      next: (response) => {
        this.userEdit.name = response.name
        this.userEdit.email = response.email
        this.userEdit.username = response.username
        
        this.isSuperuser = response.is_superuser
        this.userId = response.id;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    })    
  }

}
