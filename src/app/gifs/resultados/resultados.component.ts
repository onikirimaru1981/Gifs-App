import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  get resultados() {// Nota: Los get facilitan mucho el acceso a propiedades de un servicio en el html


    return this.gifsService.resultados;
  }



  constructor(private gifsService: GifsService) { }



}
