import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommunicationService } from '../../../_service/communication.service';
import { HttpService } from '../../../_service/http.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  viewMode = 'tab1';

  successMsg: any;
  errorMsg: any;

  leadCount:number;
  convCount:number;
  affiCount:number;
  leadListArr: any;
  affiliateListArr: any;
  _status: any;

  constructor(private _router: Router, private _apiService: HttpService) { }

  ngOnInit() {
    if(!localStorage.getItem('token')){
      this._router.navigateByUrl('landingPage');
    }else {
      this.leadConvAffiCount();
      this.leadList();
    }

    // setInterval(() => {
    //   this.leadList();
    // }, 3000);

    // setInterval(() => {
    //   this.affiliateList();
    // }, 3000);
  }

  ngOnDestroy(){
    localStorage.removeItem('token');
  }

  leadList(){
    const dataValue = {
      v_class: 'palika',
      v_funct: 'leadList',
      value: {
        token: localStorage.getItem('token')
      }
    };

    this._apiService.fetchData(dataValue)
    .then(resp => {
      console.log(resp);
      if(resp.response === 'true'){
        this.leadListArr = resp.result;
      } else {
        this.errorMsg = resp.errMessage;
        setTimeout(() => {
          this.errorMsg = '';
        }, 2000);
      }
    });
  }

  affiliateList(){
    const dataValue = {
      v_class: 'palika',
      v_funct: 'affiliateList',
      value: {
        token: localStorage.getItem('token')
      }
    };
    this._apiService.fetchData(dataValue)
    .then(resp => {
      console.log(resp);
      if ( resp.response === 'true' ) {
        this.affiliateListArr = resp.result;
      } else {
        this.errorMsg = resp.errMessage;
        setTimeout(() => {
          this.errorMsg = '';
        }, 2000);
      }
    });
  }

  leadConvAffiCount(){
    const dataValue = {
      v_class: 'palika',
      v_funct: 'count',
      value: {
        token: localStorage.getItem('token')
      }
    }
    this._apiService.fetchData(dataValue)
    .then(resp => {
      console.log(resp);
      if(resp.response === 'true'){
        this.leadCount = resp.result['leadCount'];
        this.convCount = resp.result['totalConversion'];
        this.affiCount = resp.result['affilitesCount'];
      } else {
        this.errorMsg = resp.errMessage;
        setTimeout(() => {
          this.errorMsg = '';
        }, 2000);
      }
    });
  }

  viewModeTab2(){
    this.viewMode = 'tab2';
    this.affiliateList();
  }

  changeStatus(status: any, id: any){
    if(status != 'Rejected'){
      const dataValue = {
        v_class: 'palika',
        v_funct: 'changeStatus',
        value: {
          token: localStorage.getItem('token'),
          id: id,
          status: status
        }
      }
      this._apiService.fetchData(dataValue)
      .then(resp => {
        console.log(resp);
        if(resp.response === 'true'){
          this.successMsg = 'Status changed successfully!';
          this.ngOnInit();
        } else {
          this.errorMsg = resp.errMessage;
          setTimeout(() => {
            this.errorMsg = '';
          }, 2000);
        }
      });
    }
  }

  countByUser(affiName: string ) {
    const dataValue = {
      v_class: 'palika',
      v_funct: 'countByUser',
      value: {
        token: localStorage.getItem('token')
      }
    }

    this._apiService.fetchData(dataValue)
      .then(resp => {
        console.log(resp);
        if (resp.response === 'true') {

          // this.ActivePoint = resp.result['ActivePoint'];
          // this.TotalPoint = resp.result['TotalPoint'];
          // this.Total = resp.result['Total'];
          // this.Conversion = resp.result['Conversion'];
          // this.Pending = resp.result['Pending'];
          // this.Rejected = resp.result['Rejected'];

        } else {
          this.errorMsg = resp.errMessage;
          setTimeout(() => {
            this.errorMsg = '';
          }, 2000);
        }
      });
  }

}
