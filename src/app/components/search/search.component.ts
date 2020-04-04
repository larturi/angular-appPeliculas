import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'})
export class SearchComponent implements OnInit {

  peliculasList: any[] = [];
  buscar = '';

  constructor(private peliculas: PeliculasService,
              public route: ActivatedRoute) {

        this.route.params.subscribe( parametros => {

          console.log(parametros);

          if (parametros.texto ) {
            this.buscar = parametros.texto;
            this.buscarPelicula(this.buscar);
          }

        });

  }

    ngOnInit(): void {}

    async buscarPelicula(buscar: string) {

      console.log(this.buscar);
      if (this.buscar.length === 0) {
        return;
      }

      (await this.peliculas.buscarPeliculas(this.buscar))
       .subscribe((data: any) => {
         this.peliculasList = data;
         console.log(data);
      },
       (e) => console.log(e));
    }


  }



