import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlackbeltService } from '../blackbelt.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newpet = {
    name: "",
    type: "",
    desc: "",
    skill1: "",
    skill2: "",
    skill3: "",
  }
  exs = [];
  constructor(private _route: ActivatedRoute,private _router: Router, private _httpService: BlackbeltService) { }

  ngOnInit() {

  }
  onsubmit(){
    let i = this._httpService.addpet(this.newpet);
    i.subscribe(data => {
      this.exs = []
      console.log(data)
      if(data['message']=="Exsist"){
        this.exs.push(data['data'])
      }else{
        if(data['data']['errors']){
          this.exs.push(data['data']['errors'])
        }
        if(this.exs.length < 1){
          this._router.navigate(['/Dashboard'])
          console.log(data) //success so no errors
          }
        }
    })
    this.newpet = {
      name: "",
      type: "",
      desc: "",
      skill1: "",
      skill2: "",
      skill3: "",
    }
  }

}