import { Component } from '@angular/core';
import { FormUserComponent } from "../form-user/form-user.component";
import { userUpdateRequest } from '../../../../interfaces/requests/user/userUpdateRequest';

@Component({
  selector: 'app-create-update-user',
  standalone: true,
  imports: [FormUserComponent],
  templateUrl: './create-update-user.component.html',
  styleUrl: './create-update-user.component.scss'
})
export class CreateUpdateUserComponent {
  public userEdite: userUpdateRequest = {
    name: "Frandicso Leite do Nascimento",
    email: "francisco@teste.com",
    username: "FranciscoLeite"
  }

}
