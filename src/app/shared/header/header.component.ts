import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('menuMobile') menuMobile!: ElementRef<HTMLDivElement>;
  
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
