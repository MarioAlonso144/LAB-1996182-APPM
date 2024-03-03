import { Injectable } from '@angular/core';
import { Receta } from '../interface/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  recetas: Receta[]=[
    {
      id: 1, 
      nombre: 'Portero', 
      image: 'https://tse3.mm.bing.net/th?id=OIP.CJ9tfxzO36Sl3TwenaPniQHaEK&pid=Api&P=0&h=180',
      ingredientes: ["Alto","Fuerte", "Buenos Reflejos", "Buenos pases largos", "Ordenar","Confiable"]
    },
    {
      id: 2, 
      nombre: 'Defensa', 
      image: 'https://www.thescottishsun.co.uk/wp-content/uploads/sites/2/2017/11/nintchdbpict000365633644.jpg',
      ingredientes: ['Alto',
      'Rapido',
      'Fuerte',
      'Liderazgo',
      'Inteligente',
      'Buena vision de campo',
      'Fuerte al corte',
      'Atrasado',
      'Seguro']
    },
    {
      id: 3, 
      nombre: 'Mediocampista', 
      image: 'https://tse3.mm.bing.net/th?id=OIP.7PQ6vTdpXi7KvKFMstPo8AHaE8&pid=Api&P=0&h=180',
      ingredientes: [
        'Inteligente'
,'Buen pase'
,'Calmado'
,'Rapido'
,'Creador de juego'
,'Buen tiro'
,'Equilibrio entre ataque y defensa'
,'Buena condición'
,'Buen regate'
,'Apoyo'
      ]
    },
    {
      id: 4, 
      nombre: 'Delantero', 
      image: 'https://tse4.mm.bing.net/th?id=OIP.aVLsLHZARnXbejVMS1ts7AHaE-&pid=Api&P=0&h=180',
      ingredientes: [
        'Fuerte'
        ,'Alto'
        ,'Tiro potente'
        ,'Tiro colocado'
        ,'Inteligente'
        ,'Rapido'
        ,'Buen Regate'
        ,'Buen salto'
        ,'Tiro de cabeza'
        

      ]
    }
  ];
  constructor() { }

  getReceta(idReceta: number){
    return {...this.recetas.find(
      (receta: Receta) =>{
        return receta.id === idReceta
      }
    )};
  }

  getRecetas(){
    return [...this.recetas];
  }
}