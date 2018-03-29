import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlackbeltService } from '../blackbelt.service';
@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})
export class AlphaComponent implements OnInit {
  list = []
  constructor(private _route: ActivatedRoute,private _router: Router, private _httpService: BlackbeltService) { }

  ngOnInit() {
    this.fetch()
  }
  fetch(){
    let i = this._httpService.graball();
    i.subscribe(data => {
      console.log(data);
      // this.list = data['data'];X
      for(let datas of data['data']){
        var av = 0, num = 0;
        for(let i = 0; i < datas.review.length;i++){
          av += Number(datas.review[i].star);
        }
          num = Math.trunc(av/datas.review.length)
        this.list.push({name:datas.name, av:num,_id:datas._id})
      }
      console.log(this.list)
    })
  }

}