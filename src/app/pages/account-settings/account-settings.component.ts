import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public ajustes: SettingsService)  { }

  ngOnInit() {
    this.colocarCheck();
  }

  // Funcion que se encarga de cambiar el tema de la aplicacion, para ello recibe dos parametros
  // uno de ellos es el string del tema que queremos aplicar y el otro es el link al objeto en concreto
  // donde queremos que se aplique el check
  cambiarColor( tema: string, link: any) {
    console.log(link);

    this.aplicarCheck(link);
    this.ajustes.aplicarTema(tema);


  }

  // funcion que pasado un link a un objeto del html le pone el simbolo del check
  aplicarCheck(link: any) {
    // tslint:disable-next-line: prefer-const
    let selectores = Array.from(document.getElementsByClassName('selector'));
    // tslint:disable-next-line: prefer-const
    for ( let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  // Funcion llamada desde el ngOnInit() y que se encarga de añadir
  // el atributo working a la clase del elemento html y de este modo
  // aparezca el iconito del check en el tema que este aplicado
  colocarCheck() {
    // tslint:disable-next-line: prefer-const
    let selectores = Array.from(document.getElementsByClassName('selector'));
    let tema = this.ajustes.ajustes.tema;
     // tslint:disable-next-line: prefer-const
    for ( let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        // Aqui añadimos el working
        ref.classList.add('working');
        break;
      }
    }
  }

}
