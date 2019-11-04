import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public doughnutChartLabels: Label[] = ['PSOE', 'PP', 'PODEMOS', 'VOX', 'CIUDADANOS'];
  public doughnutChartData: number[] = [200, 100, 50, 16, 23];
  public doughnutChartType: ChartType = 'doughnut';

  public labelCandidatos: Label[]  = ['P.Sanchez', 'P.Iglesias', 'P.Casado', 'A.Rivera', 'S.Abascal'];
  public puntuaciones: number[] = [ 3.1, 5.4, 3.0, 3.6, 2.7 ];

  public labelVotar: Label[] = ['Si votara', 'No Votara'];
  public votaran: number[] = [ 95, 5];

  public habraPacto: Label[] = ['Habra pacto', 'No habra pacto'];
  public pacto: number[] = [ 65, 35];

  constructor() { }

  ngOnInit() {
  }

}
