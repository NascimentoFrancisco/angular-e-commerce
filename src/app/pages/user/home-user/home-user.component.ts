import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { AccountContainerInformationComponent } from "../components/account-container-information/account-container-information.component";
import { UserResponse } from '../../../interfaces/responses/user/userResponse';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { SpinnerPageInfoComponent } from "../../../shared/spinner-info/spinner-page-info.component";
import { ContentListingComponent } from "../components/content-listing/content-listing.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [
    HeaderComponent, 
    AccountContainerInformationComponent, 
    SpinnerPageInfoComponent, 
    ContentListingComponent
  ],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss'
})
export class HomeUserComponent implements OnInit{
  public loggedInUser?: UserResponse;
  destroyedRef = inject(DestroyRef);
  
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  public getLoggedInUser(){
    let userId = this.authService.getInfoAuth("userIDKey");
    this.userService.getUser(userId!).pipe(
      takeUntilDestroyed(this.destroyedRef)
    ).subscribe({
      next: (response) => {
        if(response){
          this.loggedInUser = response;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
