import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpService } from '../_service/http.service';

//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'load-web';

  enquiryForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    comment: new FormControl('')
  });

  constructor(private _httpService: HttpService){}

  ngOnInit(): void {
    $(document).click(function(e) {
      if (!$(e.target).is('.navbar-collapse')) {
          $('.collapse').collapse('hide');      
        }
    });
  }

  enquiry() {
    console.warn(this.enquiryForm.value);
    this._httpService.saveEnquiry(this.enquiryForm.value)
    .subscribe(res => console.log(res));
  }
  

   Faq_reveal() {
    var x = document.getElementById("reveal");
    var y = document.getElementById("sd-container");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
    }
  }

}
