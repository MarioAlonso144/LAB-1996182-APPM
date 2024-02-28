import { Component, OnInit } from '@angular/core';
import { Personaje } from '../interface/personaje';
import { EnvioReceptorService } from '../service/envio-receptor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html'
})
export class InicioPage implements OnInit {

  user: Personaje = {name:'Mario Alonso object', uuid:"345234", email:"correo@gmail.com"};

  list: Personaje[]=
  [
    {name:'Mario Alonso 1', uuid:"345234", email:"correo@gmail.com"},
    {name:'Mario Alonso 2', uuid:"345234", email:"correo@gmail.com"},
    {name:'Mario Alonso 3', uuid:"345234", email:"correo@gmail.com"}
  ];

  constructor(
    private envioReceptor: EnvioReceptorService,
    private router: Router
    ) { }

  ngOnInit() {
  }


  redireccionReceptor(){
    this.envioReceptor.sendObjectSource(this.user);
    this.envioReceptor.sendListSource(this.list);

    this.router.navigate(['/receptor']);
  }

}
