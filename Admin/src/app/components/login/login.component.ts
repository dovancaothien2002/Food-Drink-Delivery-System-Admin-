import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  submited: boolean = false;
  account: any;
  err: any;
  constructor(private router: Router, private authSrc: AuthService) { }

  ngOnInit(): void {
    var json = sessionStorage.getItem('auth');
    if (json) {
      this.account = JSON.parse(json);
      console.log(json)
    }
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
  get D() { return this.formLogin.controls; }
  Onsubmit(): any {
    this.submited = true;
    if (this.formLogin.invalid) {
      // console.log('error')
      return false;
    }
    this.authSrc.login(this.formLogin.value).subscribe(res => {
      console.log(res)
      if (res.statusCode == 200) {
        this.account = res.data
        var JsonString = JSON.stringify(res.result);
        sessionStorage.setItem('auth', JsonString)
        window.location.href = 'dashboard';

      } else {
        this.err = 'Email or Password is incorrect';
      }
    })

  }
  onLogOut() {
    this.account = null;
    sessionStorage.removeItem('auth')

  }
}
