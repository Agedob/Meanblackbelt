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
      this.list = this.me['review']
      console.log(this.list)
      this.list.sort(function(a,b){return b.star - a.star})
    })
  }
  destroy(){
    let i = this._httpService.destroyme(this.id);
    i.subscribe(data => {
      console.log(data);
      this._router.navigate(['/'])
    })
  }
  destroyme(idz){
    let i = this._httpService.destroyreview(this.id, idz);
    i.subscribe(data => {
      console.log(data)
      this.search()
    })
  }

  // inc(){
  //   let i = this._httpService.addlike(this.id);
  //   i.subscribe(data => {
  //     console.log(data);
  //     this.search()
  //     this.hide = "hide"
  //   })
  // }
}
