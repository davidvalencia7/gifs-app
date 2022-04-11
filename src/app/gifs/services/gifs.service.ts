import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, ISearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private apiKey : string = '63nkE64LQDJhEY3nLQEbKbs05UjKZaBu'

  // cambiar any por su tipo
  public resultado : Gif [] = [];

  constructor( private _http : HttpClient ) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [] ;
  }

  get historial() : string[] {

    return[...this._historial]
  }

  searchGifs(query : string = '') {
    query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,9);
      this.saveHistoryLocalStorage('historial',JSON.stringify(this._historial));
    }
    //console.log(this._historial)

    this._http.get<ISearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=63nkE64LQDJhEY3nLQEbKbs05UjKZaBu&q=${ query }&limit=10`)
            .subscribe( (resp) => {
              console.log(resp.data);
              this.resultado = resp.data;
              console.log(this.resultado);

      });
  }

  saveHistoryLocalStorage(key : string, data : string){
    localStorage.setItem(key,data);
  }
}
