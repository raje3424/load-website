import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private configUrl:any = 'http://localhost:8888/interface.php';
  private headers = new Headers({'Content-Type': 'application/json'});

  private data = new BehaviorSubject('');

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) { }

  saveEnquiry(value:any): Promise<any> {
    console.log(value);
    let dataValue = {
      "v_class": "palika",
      "v_funct": "enquiry",
      "value" : value
    }

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      "Accept": "text/plain" 
    });

    return this.http.post(this.configUrl, dataValue, {headers: headers})
        .toPromise()
        .then(resp => resp.json())
        .catch(this.handleErrorObservable);
  }

  logIn(value:any): Promise<any> {
    console.log(value);
    let dataValue = {
      "v_class": "palika",
      "v_funct": "login",
      "value" : value
    }

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      "Accept": "text/plain" 
    });

    return this.http.post(this.configUrl, dataValue, {headers: headers})
        .toPromise()
        .then(resp => resp.json())
        .catch(this.handleErrorObservable);

        // let headers = new Headers({ 'Content-Type': 'application/json', "Accept": "text/plain" });
        // let options = new RequestOptions({ headers: headers });
        // return this.http.post(this.configUrl, dataValue, options)
        //     .map(res => {
        //         // login successful if there's a jwt token in the response
        //         if (res) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('token', JSON.stringify(res.token));
        //         }
        //         return res;
        //     });
  
  }

  signIn(value:any): Promise<any> {
    console.log(value);
    let dataValue = {
      "v_class": "palika",
      "v_funct": "signUp",
      "value" : value
    }

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      "Accept": "text/plain" 
    });

    return this.http.post(this.configUrl, dataValue, {headers: headers})
        .toPromise()
        .then(resp => resp.json())
        .catch(this.handleErrorObservable);
  }

  logOut(){
    let dataValue = {
      "v_class": "palika",
      "v_funct": "logout",
      "value": {
        "token": localStorage.getItem('token')
      }
    }

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      "Accept": "text/plain" 
    });

    return this.http.post(this.configUrl, dataValue, {headers: headers})
        .toPromise()
        .then(resp => resp.json())
        .catch(this.handleErrorObservable);
  }

  fetchData(dataValue){
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      "Accept": "text/plain" 
    });

    return this.http.post(this.configUrl, dataValue, {headers: headers})
        .toPromise()
        .then(resp => resp.json())
        .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }


  private handleErrorObservable (error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }

}
