import { NgIf } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-default-input-text',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './default-input-text.component.html',
  styleUrl: './default-input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultInputTextComponent),
      multi: true
    }
  ]
})
export class DefaultInputTextComponent {
  @Input() label: string | undefined;
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() id: string = "";

  private _value: any = "";
  get value(): any{
    return this._value;
  }

  set value(val: any){
    this._value = val;
    this.onChange(val)
  }

  onChange = (val: any) => {}
  onTouched = () => {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
