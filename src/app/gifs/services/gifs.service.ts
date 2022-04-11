import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, ISearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private apiKey : string = '63nkE64LQDJhEY3nLQEbKbs05UjKZaBu';
  private urlService : string = 'https://api.giphy.com/v1/gifs';

  // cambiar any por su tipo
  public resultado : Gif [] = [];

  constructor( private _http : HttpClient ) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [] ;
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];
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

    const params = new HttpParams()
        .set('api_key',this.apiKey)
        .set('limit','10')
        .set('q',query)
        console.log(params);


    this._http.get<ISearchGifsResponse>(`${this.urlService}/search`, { params })
            .subscribe( (resp) => {
              console.log(resp.data);
              this.resultado = resp.data;
              console.log(this.resultado);
              this.saveHistoryLocalStorage('resultados',JSON.stringify( this.resultado ) );

      });
  }

  saveHistoryLocalStorage(key : string, data : string){
    localStorage.setItem(key,data);
  }
}
