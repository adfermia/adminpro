import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

progreso1: number = 50;
progreso2: number = 50;
  constructor() { }

  ngOnInit() {
  }

  // Funcion que recibe un parametro de un Output de Incrementador.component.ts
  // i varia el progreso de la barra
  actualizar( event: number) {
    this.progreso1 = event;

  }





}
