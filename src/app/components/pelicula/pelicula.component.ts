import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html'})
export class PeliculaComponent implements OnInit {

  pelicula: any;
  regresarA = '';
  busqueda = '';

  // tslint:disable-next-line: variable-name
  constructor(private _ps: PeliculasService,
              public route: ActivatedRoute) {

      this.route.params.subscribe( parametros => {
           this.regresarA = parametros.pag;

           if (parametros.busqueda ) {
            this.busqueda = parametros.busqueda;
           }

           const id = parametros.id;

           this.getPelicula(id);

           });
  }

  ngOnInit(): void {}

  async getPelicula(id: string) {
    (await this._ps.getPelicula(id))
     .subscribe((data: any) => {
       this.pelicula = data;
       this.pelicula.popularidad = Number(data.popularity);
    },
     (e) => console.log(e));
  }

}
