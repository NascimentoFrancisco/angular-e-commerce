import { Component, DestroyRef, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../interfaces/responses/user/userResponse';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping_cart/shopping-cart.service';
import { ShoppingCartResponse } from '../../interfaces/responses/shopping-cart/shoppingCartResponse';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @ViewChild('menuMobile') menuMobile!: ElementRef<HTMLDivElement>;
  @ViewChild('cart_button') cart_button!: ElementRef<HTMLButtonElement>;
  @Output() searchValue = new EventEmitter<string>();
  public isAuthenticated = false;
  public loggedInUser?: UserResponse;
  public allShoppingCartByUser: ShoppingCartResponse[] = [];
  public searchFormData = {
    serach: ""
  }
  destroyedRef = inject(DestroyRef);
  
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

  public searchByValue(){
    if(this.searchFormData.serach.trim() !== ""){
      this.searchValue.emit(this.searchFormData.serach.trim());
    }
  }

  public navigateToLogin(): void {
    this.router.navigate(["/login"])
  }
  
  public navigateToCreateUser(): void {
    this.router.navigate(["user/create-edit"]);
  }

  private InitializesHeaderInformation(): void {
    if(this.authService.getInfoAuth("accessToken")){
      this.isAuthenticated = true;
    }

    if(this.isAuthenticated){
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
      })
    }
  }

  public getAllShoppingCartByUser(){
    if(this.isAuthenticated){
      let userId = this.authService.getInfoAuth("userIDKey")
      this.shoppingCartService.getAllShopingCartUser(userId!).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
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
      
      // Loads the initial state of the Shoppingcart
      this.shoppingCartService.getAllShopingCartUser(userId!).pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
        next: (response) => {
          this.allShoppingCartByUser = response;
        },
        error: (err) => {
          console.log(err);
        },
      });

      // Sign up for reactive cart updates
      this.shoppingCartService.getCartUpdates().pipe(
        takeUntilDestroyed(this.destroyedRef)
      ).subscribe({
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

  /* Navigate to user pages */
  public navigateToUserPage(){
    this.router.navigate(["user"]);
  }
  public navigateToShoppingCart(){
    this.router.navigate(["user/cart"]);
  }

  /* Menu Responsiveness */
  public openMenu(): void {
    const menu = this.menuMobile.nativeElement;
    const cart_button = this.cart_button?.nativeElement;
    if (cart_button) {
      cart_button.style.display = 'none';
    }
    menu.style.display = 'flex';
    menu.style.left = `${menu.offsetWidth * -1}px`;

    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.left = '0';
    }, 10);
  }

  public closeMenu(): void {
    const menu = this.menuMobile.nativeElement;
    const cart_button = this.cart_button?.nativeElement;
    if (cart_button) {
      cart_button.style.display = 'block';
    }
    menu.style.opacity = '0';
    setTimeout(() => {
      menu.style.display = 'none';
      menu.style.left = `${menu.offsetWidth * -1}px`;
      menu.removeAttribute('style');
    }, 300);
  }

}
