import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-content-container',
  standalone: true,
  imports: [],
  templateUrl: './not-content-container.component.html',
  styleUrl: './not-content-container.component.scss'
})
export class NotContentContainerComponent {
  @Input() title = "";
  @Input() subtitle = "";

}
