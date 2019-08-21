import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  form: FormGroup;
  errmsg: any;
  constructor(private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      grant_type: new FormControl('password'),
    });
  }


  onSubmit() {
    this.subscription = this.loginService.postData(this.form.value)
      .subscribe(res => {
        if (res.status === 200) {
          localStorage.setItem('access_token', res.body.access_token);
          this.loginService.isAuthenticated = true;
          this.router.navigate(['../','home'], { relativeTo: this.route });
        } else {
          this.errmsg = res.status + ' - ' + res.statusText;
        }
      },
        err => {
          if (err.status === 401) {
            this.errmsg = 'Invalid username or password.';
          }
          else if (err.status === 400) {
            this.errmsg = 'Invalid username or password.';
          }
          else {
            this.errmsg = "Invalid username or password";
          }
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}