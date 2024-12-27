import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBr',
  standalone: true
})
export class CurrencyBrPipe implements PipeTransform {

  transform(value: number): string {
    if(value != null){
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    }
    return "";
  }

}
