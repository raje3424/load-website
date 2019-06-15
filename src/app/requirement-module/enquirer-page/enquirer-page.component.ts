import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommunicationService } from 'src/_service/communication.service';
import { HttpService } from 'src/_service/http.service';


@Component({
  selector: 'app-enquirer-page',
  templateUrl: './enquirer-page.component.html',
  styleUrls: ['./enquirer-page.component.scss']
})
export class EnquirerPageComponent implements OnInit {

  successMsg: any;
  errorMsg: any;

  affiName: string;
  totalReferals: number;
  activePoint: number;
  referalCode: string;
  pointsEarned: number;

  constructor(private _comService: CommunicationService, private _apiService: HttpService, private _router: Router) { }

  ngOnInit() {

    if(!localStorage.getItem('token')){
      this._router.navigateByUrl('landingPage');
    }else {
      let dataValue = {
        "v_class": "palika",
        "v_funct": "affHomeData",
        "value": {
          "token": localStorage.getItem('token')
        }
      }
      this._apiService.fetchData(dataValue)
      .then(resp => {
        console.log(resp);
        if(resp.response == 'true'){
          this.affiName = resp.result['full_name'];
          this.totalReferals= resp.result['count'];
          this.activePoint= resp.result['activePoint'];
          this.referalCode = resp.result['code'];
          this.pointsEarned = resp.result['activePoint'];
        }else {
          this.affiName = resp.result['full_name'];
          this.totalReferals= 0;
          this.activePoint= 0;
          this.referalCode = resp.result['code'];
          this.pointsEarned = 0;
        }
      });
    }

  }

  ngOnDestroy(){
    localStorage.removeItem('token');
  }

}
