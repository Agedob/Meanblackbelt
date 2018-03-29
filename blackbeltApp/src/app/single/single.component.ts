import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlackbeltService } from '../blackbelt.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
id;
me;
list = [];
hide = "me"
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
  destroy(){
    let i = this._httpService.destroyme(this.id);
    i.subscribe(data => {
      console.log(data);
      this._router.navigate(['/Dashboard'])
    })
  }
  inc(){
    let i = this._httpService.addlike(this.id);
    i.subscribe(data => {
      console.log(data);
      this.search()
      this.hide = "hide"
    })
  }
}
