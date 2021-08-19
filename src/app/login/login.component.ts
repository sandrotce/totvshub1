import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { PoStorageService } from '@po-ui/ng-storage';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class  LoginComponent implements OnInit {

  hideRememberUser: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: PoStorageService,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
  }

  loginSubmit(formData: PoPageLogin) {
    //const user = Object.assign({ email: formData.login, password: formData.password });

    this.loginService.postWithPathLogin('login', formData.login, formData.password).subscribe(() => {
      this.storage.set('isLoggedIn', 'true').then(() => {
        this.router.navigate(['/']);
      });
    }, () => {
      this.poNotification.error('Invalid username or password. Please try again.');
    });

  }

}
