import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {



  get historial(): string[] { //Este get historial es del componente actual

    // Este historial es del servicio inyectado
    return this.GifsService.historial// Codigo para poder utilizar la propiedad historial del servicio inyectado
  }

  constructor(private GifsService: GifsService) { }// Inyectando el servicio para utilizar sus metodos y propiedades


  // Nota: Metodo creado para desde el sidebar podamos hacer una busqueda clicando en el enlace del historial
  buscar(termino: string) {

    this.GifsService.buscarGifs(termino)

  }



}


