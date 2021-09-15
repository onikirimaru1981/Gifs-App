import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http/";// Modulo para peticiones http a una API
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [

    // Nota:como buenas practicas,una es colocar los modulos de 3º y luego los creados por nosootros
    BrowserModule,
    HttpClientModule,// Modulo http importado
    SharedModule,
    GifsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
