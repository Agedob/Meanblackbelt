import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlackbeltService {

  constructor(private _http: HttpClient) { }
  grabpets(){
    return this._http.get('/pet');
  }
  grabme(id){
    return this._http.get('/pet/'+id);
  }
  addpet(data){
    return this._http.post('/pet', data);
  }
  destroyme(id){
    return this._http.delete('/pet/delete/'+id)
  }
  addlike(id){
    return this._http.get('/pet/add/'+id)
  }
}
