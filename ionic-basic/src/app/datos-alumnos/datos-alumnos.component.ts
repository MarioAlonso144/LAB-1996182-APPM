import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alumno } from '../interface/alumno';

@Component({
  selector: 'app-datos-alumnos',
  templateUrl: './datos-alumnos.component.html'
})
export class DatosAlumnosComponent  implements OnInit {

  @Input() alumnosList:Alumno[] =[];
  @Output() eliminar: any = new EventEmitter<Alumno>();
  @Output() editar:  any = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

}
