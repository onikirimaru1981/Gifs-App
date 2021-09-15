import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})

export class BusquedaComponent {
  // Nota: En las linea inferior se utiliza el operador Non-null assertion operator,el cual hace que tp confie en nosotros para decirle que
  // el valor de la propiedad creada nunca sera null

  // Nota2: Cuando tp nos diga que no se conoce de que tipo es una propiedad,exportaremos el <HTMLInputElement>
  // de esta forma tendremos el tipado de tp a la hora de utilizar propiedades

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; // Nota: El decorador viewChild,busca por la directiva,
  //elemento html,clase,o referencia local que definamos ejemplo: #txtBuscar,su comportamientyo es similar al ngForms

  // Nota importante!: Para utilizar el servicio es necesario inyectarlo,para ello necesitamos utilizar el contructor,
  // y definirlo como lo hacemos qui abajo,de tal forma que tendremos acceso a todas las propiedades y metodos del servicio

  constructor(private GifsService: GifsService) { }

  buscar() {

    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {// Codigo para evitar que se presione enter si no hay nada escrito

      return;

    }

    this.GifsService.buscarGifs(valor)// Utilizando metodo del servicio

    this.txtBuscar.nativeElement.value = ''; //Con esta linea de codigo reseteamos el input


  }
}

// Nota grande:Se puede utilizar un nuevo! operador de expresión postfija para afirmar que su operando no es nulo ni 
// indefinido en contextos en los que el verificador de tipos no puede concluir ese hecho.En concreto, la operación x! 
// produce un valor del tipo de x con la exclusión de nulos e indefinidos.De forma similar a las aserciones de tipo de
//  las formas < T > x y x como T, el operador de aserción no nulo! se elimina simplemente en el código JavaScript emitido.


