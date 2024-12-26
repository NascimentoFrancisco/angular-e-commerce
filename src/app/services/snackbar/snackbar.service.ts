import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarComponent!: SnackbarComponent;

  constructor() { }

  register(snackbar: SnackbarComponent): void {
    this.snackbarComponent = snackbar;
  }

  show(message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number = 3000): void {
    this.snackbarComponent.show(message, type, duration);
  }

}
