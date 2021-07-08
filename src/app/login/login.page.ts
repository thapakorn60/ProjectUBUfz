/* tslint:disable */
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import firebase from 'firebase/app';

import '@firebase/auth';

import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersService } from '../api/users.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { constants } from 'buffer';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // @ViewChild(AuthFormComponent) loginForm: AuthFormComponent;
  url = 'http://localhost:3000/user/getuserDetail';
  submitError: string;
  signInForm: FormGroup;
  authRedirectResult: Subscription;
  userId: string;
  userEmail: string;
  email: '';
  password: '';

  login: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });
  hide = true;
  get emailInput() {
    return this.login.get('email');
  }
  get passwordInput() {
    return this.login.get('password');
  }

  isLoading = false;
  private authStatusSub: Subscription;
  status;
  public loginData = {
    email: '',
    password: ''
  };

  constructor(    private router: Router,
                  private ngZone: NgZone,
                  public loadingController: LoadingController,
                  public navCtrl: NavController,
                  private userService: UsersService,
                  private authService: AuthService,
                  private http: HttpClient
                  ){     }
  ngOnInit(): void {
    // window.location.reload();
    this.userService.autoAuthUser();
    this.status = this.userService.getAuthStatusListener();
    console.log(this.status);
    if (this.status === true) {
      this.router.navigate(['/home']);
    }

    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
        console.log('Authentication type : ', typeof authStatus);
      });
    }
    logIn() {
      this.userService.login(
        this.loginData.email,
        this.loginData.password
      );
      // console.log(this.loginData.email ,this.loginData.password);
      
        this.http.get<{messaeg: string, email: string, status: any}>(this.url + '/' + this.loginData.email).subscribe((res)=>{
        localStorage.setItem('data_user', res.email);
        localStorage.setItem('id_user', res['_id']);
      });
      // window.location.reload();
      // this.router.navigateByUrl('home');
    }

  // async loginUser(credentials: UserCredential): Promise<void> {
  //   try {
  //     const userCredential: firebase.auth.UserCredential = await this.authService.login(
  //       credentials.email,
  //       credentials.password
  //       );
  //     this.authService.userId = userCredential.user.uid;
  //     this.http.get<{messaeg: string, email: string, status: any}>(this.url + '/' + credentials.email).subscribe((res)=>{
  //       localStorage.setItem('data_user', res.email);
  //       // console.log(res);
  //       localStorage.setItem('id_user', res['_id']);
  //       // this.getUser();
  //     })
  //     await this.loginForm.hideLoading();
  //     // this.userService.getuserDetail();
  //     this.router.navigateByUrl('home');

  //   } catch (error) {
  //     await this.loginForm.hideLoading();
  //     this.loginForm.handleError(error);
  //   }
  // }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }



}
