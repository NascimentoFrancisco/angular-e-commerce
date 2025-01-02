import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../../../interfaces/responses/user/userResponse';

@Component({
  selector: 'app-account-container-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-container-information.component.html',
  styleUrl: './account-container-information.component.scss'
})
export class AccountContainerInformationComponent {
  @Input() user!: UserResponse;
  @Input() allowsActions = false;
  
}
