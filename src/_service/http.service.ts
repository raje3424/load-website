import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private configUrl:any = 'http://192.168.0.4:4447/';
  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) { }

  saveEnquiry(value:any): Promise<any> {
    console.log(value);
    let data = {
      "function": "Hello",
      "args" : value
    }

    let headers = new Headers({ 
      'Content-Type': 'application/json',
      "Accept": "text/plain" 
    });

    return this.http.post(this.configUrl, value, {headers: this.headers})
        .toPromise()
        .then(resp => resp.json())
        .catch(this.handleError);
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
