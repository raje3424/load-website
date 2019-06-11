import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { HttpService } from '../_service/http.service';
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // title = 'load-web';
  // enquiryForm: FormGroup;
  // successMsg: string;
  // errorMsg: string;

  constructor(private _httpService: HttpService, private formBuilder: FormBuilder){
    // this.enquiryForm = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   comment: ['', [Validators.required]],
    // });
  }

  ngOnInit(): void {
    // $(document).click(function(e) {
    //   if (!$(e.target).is('.navbar-collapse')) {
    //       $('.collapse').collapse('hide');      
    //     }
    // });
  }

  // enquiry() {
  //   console.warn(this.enquiryForm.value);
  //   this._httpService.saveEnquiry(this.enquiryForm.value)
  //   .then(resp => {
  //     console.log(resp);
  //     if(resp == 'true'){
  //       this.successMsg = 'Form Submitted Successfully!';
  //       setTimeout(()=>{
  //         this.enquiryForm.reset();
  //         this.successMsg = '';
  //       }, 1500);
  //     }else {
  //       this.errorMsg = 'Something went wrong, try again!';
  //       setTimeout(()=>{
  //         this.errorMsg = '';
  //       }, 2000);
  //     }
  //   });
  // }
  

  //  Faq_reveal() {
  //   var x = document.getElementById("reveal");
  //   var y = document.getElementById("sd-container");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //     y.style.display = "none";
  //   } else {
  //     x.style.display = "none";
  //   }
  // }

}
