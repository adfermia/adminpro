import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', null) txtProgress: ElementRef;

  // Aqui tenemos los inputs que son los valores que recibiremos por parametro al llamar a
  // este componente desde cualquier template, así asignaremos una leyenda y un progreso
  // inical a este componente. Notese que estos dos valores en caso de no recibir nada
  // tendran un valor por defecto de Leyenda en el caso de la leyenda y de 50 en el caso
  // del progreso.
  @Input('nombre')leyenda: string = 'Leyenda';
  @Input()progreso: number = 50;

  // Esta es la variable que indicara al componente externo que el progreso ha cambiado,
  // para ello haremos uso del @Output() que nos permite que aquellos componentes que usen
  // este incrementador puedan saber cuando ha habido un cambio en el progreso.
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  // Funcion que cambia el valor, es llamada desde el template de progress component html
  // La funcion recibe un numero por parametro y incrementa o decrementa el valor del progreso
  // segun si el numero recibido es positivo o negativo
  cambiarValor( valor: number) {

    // Si el valor se encuentra entre 100 i 0 simplemente le añade el valor al progreso
    if ( this.progreso <= 100 && this.progreso >= 0) {
      this.progreso += valor;
    }
    // En caso de ser mayor que 100 igualamos el valor a 100 ya que este es su valor maximo
    if ( this.progreso >= 100 ) {
      this.progreso = 100;
    }
    // En caso de ser menor que 0 igualamos el valor a 0 ya que este es su valor minimo
    if ( this.progreso <= 0 ) {
      this.progreso = 0;
    }

    // Publicamos nuestro cambio de valor para que los componentes que esten usando este incrementador
    // cambien el valor en su progress bar
    this.cambioValor.emit(this.progreso);

    // ponemos el foco en el elemento
    this.txtProgress.nativeElement.focus();
  }


  // Esta funcion controla el valor del progreso pero de el valor ingresado en el input,
  // ademas de recoger el valor ingresado i publicarlo para que el componente padre lo sepa
  // controla que el valor del progreso no se salga de los limites
  onChange(newValue: number) {

    // La funcion getElementsByName() nos devuelve un array de todos los elementos
    // cuyo nombre coincida con el string pasado a la funcion.
    // let elemHTML: any = document.getElementsByName('progreso')[0];

    // Con este metodo igualamaos el valor del componente html a nuestro progreso, asi
    // el usuario no podra escribir ni numeros negativos, ni mayores de 100, además
    // el usuario en caso de escribir 012 en el componente aparecera como 12.
    // elemHTML.value = Number(this.progreso);
    // 0 < progreso < 100


    this.txtProgress.nativeElement.value = this.progreso;


    if (newValue >= 0 && newValue <= 100) {
      this.progreso = newValue;
    }
    // progreso > 100
    if ( newValue > 100 ) {
      this.progreso = 100;
    }
    // progreso < 0
    if ( newValue < 0 ) {
      this.progreso = 0;
    }
    // emitimos el valor del progreso
    this.cambioValor.emit(this.progreso);


  }

}
