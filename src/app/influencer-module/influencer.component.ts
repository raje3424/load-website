import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../_service/http.service';

@Component({
  selector: 'influencer-root',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.css']
})

export class InfluencerComponent implements OnInit {

  constructor(private _httpService: HttpService){

  }

  ngOnInit(): void {
  }

}
