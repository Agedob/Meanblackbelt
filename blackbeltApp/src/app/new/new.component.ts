import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlackbeltService } from '../blackbelt.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newmovie = {
    name: "",
    yourname: '',
    stars:1,
    desc: "",
  }
  exsist;
  exs = [];
  constructor(private _route: ActivatedRoute,private _router: Router, private _httpService: BlackbeltService) { }

  ngOnInit() {

  }
  onsubmit(){
    let i = this._httpService.addmovie(this.newmovie);
    i.subscribe(data => {
      this.exs = []
      this.exsist = ''
      if(data['message']=="Exsist"){
        this.exsist = "Already exsists"
      }else{
        if(data['data']['errors']){
          this.exs.push(data['data']['errors'])
        }
        if(this.exs.length < 1){
          this._router.navigate(['/'])
          console.log(data) //success so no errors
          }
        }
    })
    this.newmovie = {
      name: "",
      yourname: '',
      stars:1,
      desc: "",
    }
  }

}