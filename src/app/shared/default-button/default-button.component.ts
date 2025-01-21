import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CircularProgressComponent } from "../circular-progress/circular-progress.component";

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [CircularProgressComponent],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss'
})
export class DefaultButtonComponent {
  @Input() title: string = ""
  @Input() type: string = "button";
  @Input() clicked = false;
  @Output() action = new EventEmitter<void>();

  public onClick(){
    if(!this.clicked){
      this.action.emit();
    }
  }

}
