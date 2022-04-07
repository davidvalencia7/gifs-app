import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  constructor( private _gifsService : GifsService) { }

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(){
    //console.log(this.txtBuscar);
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0)
      return;

    this._gifsService.searchGifs(valor)
    this.txtBuscar.nativeElement.value = '';
  }
}
