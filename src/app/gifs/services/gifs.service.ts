import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private apiKey : string = '63nkE64LQDJhEY3nLQEbKbs05UjKZaBu'

  constructor( private _http : HttpClient ) { }

  get historial() : string[] {
    
    return[...this._historial]
  }

  searchGifs(query : string = '') {
    query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,9);
    }
    //console.log(this._historial)

    this._http.get(`https://api.giphy.com/v1/gifs/search?api_key=63nkE64LQDJhEY3nLQEbKbs05UjKZaBu&q=${{ query }}&limit=10`)
            .subscribe( (resp : any) => {
              console.log(resp.data);
      });
  }
}
