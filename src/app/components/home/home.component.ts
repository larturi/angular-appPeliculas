import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'})
export class HomeComponent implements OnInit {

  populares: any;
  cartelera: any;
  pupularesInfantil: any;

  // tslint:disable-next-line: variable-name
  constructor(private _ps: PeliculasService) {}

  ngOnInit() {
    this.getCartelera();
    this.getPopulares();
    this.getPopularesInfantil();
  }

  async getCartelera() {
    (await this._ps.getCartelera())
     .subscribe((data: any) => {
       this.cartelera = data;
       console.log(data);
    },
     (e) => console.log(e));
  }

  async getPopulares() {
    (await this._ps.getPopulares())
     .subscribe((data: any) => {
       this.populares = data;
       // console.log(data);
    },
     (e) => console.log(e));
  }

  async getPopularesInfantil() {
    (await this._ps.getPopularesInfantil())
     .subscribe((data: any) => {
       this.pupularesInfantil = data;
       // console.log(data);
    },
     (e) => console.log(e));
  }

}
