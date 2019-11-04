import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };


  constructor( @Inject(DOCUMENT) private document) {
    this.cargarAjustes();
   }

  guardarAjustes() {

    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

    }
    this.aplicarTema(this.ajustes.tema);
  }
  aplicarTema( tema: string) {
    // tslint:disable-next-line: prefer-const
    let url = `assets/css/colors/${tema}.css`;
    this.document.getElementById('theme').setAttribute('href', url);

    // Asignamos los valores del tema i el temaUrl al servicio
    // que se encarga de guardar los ajustes en el local storage
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    // Una vez realizados los cambios ahora si lo guardamos en el localStorage
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
