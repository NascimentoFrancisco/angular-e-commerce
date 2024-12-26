import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../interfaces/responses/user/userResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @ViewChild('menuMobile') menuMobile!: ElementRef<HTMLDivElement>;
  public isAuthenticated = false;
  public loggedInUser?: UserResponse;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.InitializesHeaderInformation();
  }

  public navigateToLogin(): void {
    this.router.navigate(["/login"])
  }
  
  private InitializesHeaderInformation(): void {
    if(this.authService.getInfoAuth("accessToken")){
      this.isAuthenticated = true;
    }

    if(this.isAuthenticated){
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
      })
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  /* Menu Responsiveness */
  public openMenu(): void {
    const menu = this.menuMobile.nativeElement;
    menu.style.display = 'flex';
    menu.style.left = `${menu.offsetWidth * -1}px`;

    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.left = '0';
    }, 10);
  }

  public closeMenu(): void {
    const menu = this.menuMobile.nativeElement;
    menu.style.opacity = '0';
    setTimeout(() => {
      menu.style.display = 'none';
      menu.style.left = `${menu.offsetWidth * -1}px`;
      menu.removeAttribute('style');
    }, 300);
  }

}
