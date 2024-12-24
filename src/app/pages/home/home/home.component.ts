import { Component } from '@angular/core';
import { AuthFormsComponent } from "../../auth/auth-forms/auth-forms.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthFormsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
