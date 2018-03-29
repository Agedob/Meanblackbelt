import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlackbeltService {

  constructor(private _http: HttpClient) { }
  graball(){
    return this._http.get('/movie');
  }
  grabme(id){
    return this._http.get('/movie/'+id);
  }
  addmovie(data){
    return this._http.post('/movie', data);
  }
  destroyme(id){
    return this._http.delete('/movie/delete/'+id)
  }
  addlike(id){
    return this._http.get('/movie/add/'+id)
  }
  destroyreview(id,data){
    return this._http.post('/movie/delete/review/'+id, {thing:data} );
  }
  addreview(id,data){
    return this._http.post('/movie/review/'+id, data)
  }
}
