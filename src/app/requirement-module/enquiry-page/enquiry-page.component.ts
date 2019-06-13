import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry-page',
  templateUrl: './enquiry-page.component.html',
  styleUrls: ['./enquiry-page.component.scss']
})
export class EnquiryPageComponent implements OnInit {
  enquiryForm: FormGroup;
  successMsg: string;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder) { 
    this.enquiryForm = this.formBuilder.group({
      studentFN: ['', [Validators.required]],
      parentFN: ['', [Validators.required]],
      schoolName: ['', [Validators.required]],
      class: ['', [Validators.required]],
      board: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobNo: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      address: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      note: [''],
      refCode: [''],
    });
  }

  ngOnInit() {
  }

  get mobNo() {
    return this.enquiryForm.get('mobNo');
  }

  get class() {
    return this.enquiryForm.get('mobNo');
  }

  enquiry(){
    console.log('Enquiry');
    console.warn(this.enquiryForm.value);
    // this._apiService.saveEnquiry(this.enquiryForm.value)
    // .then(resp => {
    //   console.log(resp);
    //   if(resp.response== 'true'){
    //     this.successMsg = 'Form Submitted Successfully!';
    //     setTimeout(()=>{
    //       this.enquiryForm.reset();
    //       this.successMsg = '';
    //     }, 1500);
    //   }else {
    //     this.errorMsg = 'Something went wrong, try again!';
    //     setTimeout(()=>{
    //       this.errorMsg = '';
    //     }, 2000);
    //   }
    // });
  }

}
