import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  standalone: true,
  imports: [],
  templateUrl: './circular-progress.component.html',
  styleUrl: './circular-progress.component.scss'
})
export class CircularProgressComponent {
  @Input() backgroundColor: string = '#fa8601';
}
