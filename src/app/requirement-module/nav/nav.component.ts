import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

import { CommunicationService } from '../../../_service/communication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentValue: any;
  isLoggedIn: boolean = false;
  successMsg: string;
  errorMsg: string;
  AffiliateOrAdmin: string;

  constructor(private _comService: CommunicationService, private _router: Router, private location: PlatformLocation) {
    this._comService.showLogoutButton.subscribe(value => {
      if(value){
        this.toggleLoginLogoutText(value);
      }
    });

    this._comService.whoIsLogged.subscribe(value => {
      if(value){
        this.AffiliateOrAdmin = value;
      }
    });
     
    location.onPopState(() => {
      console.log(window.location.pathname);
      // if(window.location.pathname === '/landingPage'){
      //   localStorage.clear();
      //   this._comService.hideLogoutButtonMethod();
      // }
    });
  }


  ngOnInit(){
    if(window.location.pathname === '/admin'){
      this.AffiliateOrAdmin = 'Admin';
    }else if(window.location.pathname === '/enquirer'){
      this.AffiliateOrAdmin = 'Affiliate';
    }

    if(localStorage.getItem('token')){
      this.toggleLoginLogoutText('show');    
    }else {
      this.toggleLoginLogoutText('hide');  
      //this.logOut();  
    }
  }

  ngOnDestroy(){
    this._comService.hideLogoutButtonMethod();
    localStorage.clear();
  }

  shareData() {
    console.log('In shareData fn');
    this._comService.toggleMessage('toggle');
  }

  toggleLoginSignupPopup(){
    console.log('toggleLoginSignupPopup');
    this.shareData();
  }

  toggleLoginLogoutText(currentData){
    console.log('>> '+currentData);
    if(currentData === 'show'){
      this.isLoggedIn = true;
    }else {
      this.isLoggedIn = false;
    }
  }

  logOut(){
    console.log('Logging out!');
    this.successMsg = 'Wait...!';
        setTimeout(()=>{
          this.successMsg = '';
          localStorage.clear();
          this._comService.hideLogoutButtonMethod();
          this._comService.whoIsLoggedMethod('');
          this._router.navigateByUrl('');
        }, 1500);
  }
}

