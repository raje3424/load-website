import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Headers, RequestOptions } from '@angular/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry, map } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'text/plain'
  })
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //configUrl = "http://localhost:8888/assets/load-server/interface.php";
  //configUrl = "http://localhost:8888/interface.php";
  private configUrl:any = 'http://192.168.0.17:4447';

  constructor(private http: Http) { }

  saveEnquiry(value:any): Observable<any> {
    console.log(value);
    let data = {
      "function": "Hello",
      "args" : value
    }


      let headers = new Headers({ 
        'Content-Type': 'application/json',
        "Accept": "text/plain" 
      });

      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.configUrl, data, options)
                  .map(this.extractData)
                  .catch(this.handleErrorObservable);

      // return this.http.post(this.configUrl, data, httpOptions)
      //       .pipe(map(res => {
      //           // login successful if there's a user in the response
                
      //           return res;
      //       }));

      // return this.http.post(this.configUrl, data, httpOptions).pipe(
      //   map(data => {
      //     return data;
      //   }),
      //   catchError(error => {
      //     return Observable.throw('Something went wrong ;)');
      //   })
      // );

      // return this.http.post(this.configUrl, data)
      //             .map(this.extractData)
      //             .catch(this.handleErrorObservable);

    //return this.http.post(this.configUrl, data, httpOptions);
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
