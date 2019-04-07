import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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
  private configUrl:any;

  constructor(private http: HttpClient) { }

  saveEnquiry(value:any) {
    console.log(value);
    return this.http.post(this.configUrl, value, httpOptions);
  }

  

}
