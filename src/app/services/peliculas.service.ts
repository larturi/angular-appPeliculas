import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pelicula } from '../interfaces/pelicula.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  getApiKey() {
    const apiKey = 'a6c660c309daa96a66064788072ed995';
    return apiKey;
  }

  async getQueryAsync(query: string) {
    const apiKey = this.getApiKey();
    const url = `https://api.themoviedb.org/3/${ query }&api_key=${ apiKey }`;
    // console.log(url);
    return this.http.get(url);
  }

  async getCartelera() {
    const desde = new Date();
    const hasta = new Date();
    hasta.setDate( hasta.getDate() + 7 );

    const desdeStr = `${ desde.getFullYear() }-${ this.PadLeft(desde.getMonth() + 1, 2)}-${ this.PadLeft(desde.getDate(), 2) }`;
    const hastaStr = `${ hasta.getFullYear() }-${ this.PadLeft(hasta.getMonth() + 1, 2)}-${ this.PadLeft(hasta.getDate(), 2) }`;

    // tslint:disable-next-line: max-line-length
    const obs = await this.getQueryAsync(`discover/movie?language=es&sort_by=popularity.desc&primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }`);
    return obs.pipe(map(
      (data: any) => data.results)
    );
  }

  async getPopulares() {
    const obs = await this.getQueryAsync('trending/movie/week?language=es&sort_by=popularity.desc');
    return obs.pipe(map(
      (data: any) => data.results)
    );
  }

  async getPopularesInfantil() {
    const obs = await this.getQueryAsync('discover/movie?language=es&certification_country=DE&certification.lte=6');
    return obs.pipe(map(
      (data: any) => data.results)
    );
  }

 async getPelicula(id: string) {
   const obs = await this.getQueryAsync(`movie/${id}?language=es`);
   return obs.pipe(map(
     (data: any) => data)
   );
 }

 async buscarPeliculas(termino: string) {
  const obs = await this.getQueryAsync(`search/movie?language=es&query=${termino}&sort_by=popularity.desc`);

  return obs.pipe(map(
    (data: any) => data.results)
  );
 }

 PadLeft(value, length) {
  return (value.toString().length < length) ? this.PadLeft('0' + value, length) : value;
}

}
