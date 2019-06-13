import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  
  private data = new BehaviorSubject('');
  toggleVal = this.data.asObservable();
  isLoggedIn = this.data.asObservable();

  showLogoutButton: Subject<any> = new Subject();
  whoIsLogged: Subject<any> = new Subject();

  constructor(private http: Http) { }


  toggleMessage(value) {
    this.data.next(value);
  }

  isLoggedInValForBlockHideShow(value){
    this.data.next(value);
  }

  showLogoutButtonMethod(){
    this.showLogoutButton.next('show');
  }

  hideLogoutButtonMethod(){
    this.showLogoutButton.next('hide');
  }

  whoIsLoggedMethod(value){
    this.whoIsLogged.next(value);
  }

}

