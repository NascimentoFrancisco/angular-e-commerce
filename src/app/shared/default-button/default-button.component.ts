import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss'
})
export class DefaultButtonComponent {
  @Input() title: string = ""
  @Input() type: string = "button";
  @Output() action = new EventEmitter<void>();

  public onClick(){
    this.action.emit();
  }

}
