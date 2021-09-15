// import { animateChild } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root' // Nota: en este decorador la propiedad providedIn: 'root',tiene como funcion que el servicio,
  // a nivel global, de tal forma que pueda ser accesible desde cualquier modulo,sin necesidad de importarlo,
  // si lo importaramos a un modulo especifico,este solo funcionara ahi.
})
export class GifsService {
  private apiKey: string = environment.apiKey;
  private servicioUrl: string = environment.servicioUrl;
  private _historial: string[] = [];
  //TODO: cambiar any por tipo correspondiente
  public resultados: Gif[] = [];// Propiedad que almacenara la resp,y el tipo es el de la interfaz


  get historial() {

    return [...this._historial]; //Nota: de esta forma rompemos con la referenciaal areglo original 
    //  y nos devuelve uno nuevo,asegurandonos de que si hubiera alguna modificacion nuestro areglo original este intacto
  }


  // Nota: El constructor se ejecutara una sola y unica vez,cuando el servicio sea llamado
  constructor(private http: HttpClient) { // Inyectando el http

    //                                            2º Forma en una sola linea

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //Nota: Si regresara null seria una reglo vacio
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];// Utilizando el localStorage.getItem para mostrar los resultados

    //                                            1º Forma de resolver el cargar el local storage
    // if (localStorage.getItem('historial')) {

    //   this._historial = JSON.parse(localStorage.getItem('historial')!); //Nota: acordarse de que cuando sabes que un valor es siempre algo,
    //   // y tp nos marca el error,podemos hacer que lo obvie de esta forma ! poniendo este signo

    // }
  }


  // Nota: metodo para introducir elemento nuevo en el _historial original
  buscarGifs(query: string = '') {

    //query = query.trim().replace(/^\w/, (c) => c.toUpperCase()); //Con este codigo tranformamos todo el texto capitalizado,y
    //quitamos espacios adelante y atras con el trim()

    if (!this._historial.includes(query)) {// Con este codigo estamos diciendo que si query,que es el valor introducido no esta
      // en el areglo de historial,lo incluya

      this._historial.unshift(query);// Metodo unshift para introducir elemento al principio del areglo

      this._historial = this._historial.splice(0, 10); //Con este codigo logramos que todo elemento del areglo
      // que supere los 10 elementos,se elimine el mas antiguo

      //                                               GRABAR en LocalStorage

      localStorage.setItem('historial', JSON.stringify(this._historial));// La propiedad JSON.stringify() nos tranforma la informaciond e un objeto a un areglo

    };

    //  El objeto HttpParams() se encarga de definir los parametros para mas tarde poder modificarlos y alterar las busquedas
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // console.log(params.toString());


    // Codigo para la peticion http,añadiendo la interfaz de la resp para tener el tipado de tp
    // this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: params }) //1º Forma
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })// 2º Forma
      .subscribe((resp) => {// El subscribe se comporta igual que el .then de las promesas,cuando se resuelva la peticion se ejecutara este codigo

        console.log(resp.data);
        this.resultados = resp.data // Asignando la respùesta http`a la propiedad creada en el servicio
        localStorage.setItem('resultado', JSON.stringify(this.resultados));// inyectando en el localStorage los resultados


      })











  }


}
