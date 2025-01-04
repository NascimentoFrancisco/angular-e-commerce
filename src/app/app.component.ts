import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnackbarComponent } from "./shared/snackbar/snackbar.component";
import { SnackbarService } from './services/snackbar/snackbar.service';
import { ConfirmationModalComponent } from "./shared/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent, ConfirmationModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
  title = 'angular_e-commerce';

  constructor(private snackbarService: SnackbarService){}

  ngAfterViewInit(): void {
    this.snackbarService.register(this.snackbar);
  }
}
