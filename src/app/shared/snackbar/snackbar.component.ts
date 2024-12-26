import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent implements OnInit {
  isVisible = false;
  message = '';
  type: 'success' | 'error' | 'warning' | 'info' = 'info'; // Tipos suportados

  constructor() {}

  ngOnInit(): void {}

  public show(message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number = 3000): void {
    this.message = message;
    this.type = type;
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, duration);
  }

}
