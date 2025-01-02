import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { AccountContainerInformationComponent } from "../components/account-container-information/account-container-information.component";
import { ContentListingComponent } from "../components/content-listing/content-listing.component";
import { SpinnerPageInfoComponent } from "../../../shared/spinner-info/spinner-page-info.component";
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserResponse } from '../../../interfaces/responses/user/userResponse';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [HeaderComponent, AccountContainerInformationComponent, ContentListingComponent, SpinnerPageInfoComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit{
  public loggedInUser?: UserResponse;

  constructor(
      private userService: UserService,
      private authService: AuthService
    ) {}
  
  ngOnInit(): void {
    this.getLoggedInUser();
  }

  public getLoggedInUser(){
    let userId = this.authService.getInfoAuth("userIDKey");
    this.userService.getUser(userId!).subscribe({
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
