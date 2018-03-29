import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlackbeltService } from '../blackbelt.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id;
me;
list;
  constructor(private _route: ActivatedRoute,private _router: Router, private _httpService: BlackbeltService) { }
  
  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = (params['id']));
    this.search();
    // console.log(params['id'])
  }

  search(){
    console.log('searching...',this.id)
    let obs = this._httpService.grabme(this.id);
    obs.subscribe(data => {
      console.log(data);
      this.me = data
      this.list = this.me['skill']
    })
  }
}