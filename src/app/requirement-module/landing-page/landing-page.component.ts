import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { CommunicationService } from '../../../_service/communication.service';
import { HttpService } from '../../../_service/http.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  toggleLoginSignup: boolean = false;
  signupBlockToggle: boolean = false;

  loginForm: FormGroup;
  signupForm: FormGroup;
  successMsg: any;
  errorMsg: any;

  constructor(private formBuilder: FormBuilder, private _router: Router, private _comService: CommunicationService, private _apiService: HttpService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', [Validators.required]],
      mobNo: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
  }

  ngOnInit() {
      this._comService.toggleVal.subscribe(currentData => 
        {
          this.toggleLoginBlockMethod(currentData);
        }
      )
  }

  get password() {
    return this.signupForm.get('password');
  } 

  get mobNo() {
    return this.signupForm.get('mobNo');
  }

  toggleLoginBlockMethod(currentData){
    if(currentData){
      if(this.toggleLoginSignup){
        this.toggleLoginSignup = false;
      }else {
        this.toggleLoginSignup = true;
      }

      if(this.signupBlockToggle == true){
        this.signupBlockToggle = false;
        this.toggleLoginSignup = false;
      }
    }
  }

  signupBlock(){
    this.toggleLoginSignup = !this.toggleLoginSignup;
    this.signupBlockToggle = !this.signupBlockToggle;
  }

  logIn(){
    console.log('Login');
    console.warn(this.loginForm.value);
    this._apiService.logIn(this.loginForm.value)
    .then(resp => {
      console.log(resp);
      if(resp.response == 'true'){
        if(resp.adminFlag == 1){
          this.successMsg = 'Wait...!';
          setTimeout(()=>{
            this.loginForm.reset();
            this.successMsg = '';
            localStorage.setItem('token', JSON.stringify(resp.token));
            this._comService.showLogoutButtonMethod();
            this._comService.whoIsLoggedMethod('Admin');
            this._router.navigateByUrl('admin');
          }, 1500);
        }else {
          this.successMsg = 'Wait...!';
          setTimeout(()=>{
            this.loginForm.reset();
            this.successMsg = '';
            localStorage.setItem('token', JSON.stringify(resp.token));
            this._comService.showLogoutButtonMethod();
            this._comService.whoIsLoggedMethod('Affiliate');
            this._router.navigateByUrl('enquirer');
          }, 1500);
        }
      }else  if(resp.response == 'rfalse'){
        this.errorMsg = resp.errMessage;
        setTimeout(()=>{
          this.errorMsg = '';
        }, 2000);
      }else {
        {
          this.errorMsg = resp.errMessage;
          setTimeout(()=>{
            this.errorMsg = '';
          }, 2000);
        }
      }
    });
  }

  signIn(){
    console.log('signup');
    console.warn(this.signupForm.value);
    if(this.signupForm.controls['password'].value === this.signupForm.controls['confPassword'].value){
      this._apiService.signIn(this.signupForm.value)
      .then(resp => {
        console.log(resp);
        if(resp.response== 'true'){
          this.successMsg = 'Registered Successfully!';
          setTimeout(()=>{
            this.signupForm.reset();
            this.successMsg = '';
          }, 1500);
        }else {
          this.errorMsg = resp.errMessage;
          setTimeout(()=>{
            this.errorMsg = '';
          }, 2000);
        }
      });
    }else {
      alert('Password & confirm password should be same!');
    }
    
  }

}