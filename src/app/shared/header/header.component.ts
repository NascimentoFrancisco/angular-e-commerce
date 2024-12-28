import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../interfaces/responses/user/userResponse';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping_cart/shopping-cart.service';
import { ShoppingCartResponse } from '../../interfaces/responses/shopping-cart/shoppingCartResponse';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @ViewChild('menuMobile') menuMobile!: ElementRef<HTMLDivElement>;
  @ViewChild('cart_button') cart_button!: ElementRef<HTMLButtonElement>;
  public isAuthenticated = false;
  public loggedInUser?: UserResponse;
  public allShoppingCartByUser: ShoppingCartResponse[] = [];
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.InitializesHeaderInformation();
    this.initializeCart();
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

  public getAllShoppingCartByUser(){
    if(this.isAuthenticated){
      let userId = this.authService.getInfoAuth("userIDKey")
      this.shoppingCartService.getAllShopingCartUser(userId!).subscribe({
        next: (response) => {
          this.allShoppingCartByUser = response;
        },
        error: (err) =>{
          console.log(err);
        }
      });
    }
  }

  private initializeCart(): void {
    if (this.isAuthenticated) {
      const userId = this.authService.getInfoAuth('userIDKey');
      
      // Carrega o estado inicial do carrinho
      this.shoppingCartService.getAllShopingCartUser(userId!).subscribe({
        next: (response) => {
          this.allShoppingCartByUser = response;
        },
        error: (err) => {
          console.log(err);
        },
      });

      // Inscreve-se para atualizações reativas do carrinho
      this.shoppingCartService.getCartUpdates().subscribe({
        next: (updatedCart) => {
          this.allShoppingCartByUser = updatedCart;
        },
        error: (err) => {
          console.log('Erro ao atualizar carrinho:', err);
        },
      });
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  /* Menu Responsiveness */
  public openMenu(): void {
    const menu = this.menuMobile.nativeElement;
    const cart_button = this.cart_button.nativeElement;
    cart_button.style.display = 'none';
    menu.style.display = 'flex';
    menu.style.left = `${menu.offsetWidth * -1}px`;

    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.left = '0';
    }, 10);
  }

  public closeMenu(): void {
    const menu = this.menuMobile.nativeElement;
    const cart_button = this.cart_button.nativeElement;
    cart_button.style.display = 'block';
    menu.style.opacity = '0';
    setTimeout(() => {
      menu.style.display = 'none';
      menu.style.left = `${menu.offsetWidth * -1}px`;
      menu.removeAttribute('style');
    }, 300);
  }

}
