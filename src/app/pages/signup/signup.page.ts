import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormSignupComponent } from 'src/app/components/auth-form-signup/auth-form-signup.component';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { UsersService } from 'src/app/api/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  person = {
    email: '',
    password: '',
    // cpassword: '',
    // img: '',
    name: '',
    // tel: '',
    // age: '',
    // sex: '',
    // lifestyle: {},
    // educational: '',
    // faculty: '',
    // year: '',
    // facebook: '',
    // instagram: '',
    // other: ''
  };
  @ViewChild(AuthFormSignupComponent)
  signupForm: AuthFormSignupComponent;
  constructor(private authService: AuthService,
              private router: Router,
              private usersService: UsersService) { }

  ngOnInit() { }

  async signupUser(credentials: UserCredential): Promise<void> {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.signup(
        credentials.email,
        credentials.password
      );
      this.authService.userId = userCredential.user.uid;
      await this.signupForm.hideLoading();
      this.router.navigateByUrl('login');
    } catch (error) {
      await this.signupForm.hideLoading();
      this.signupForm.handleError(error);
    }
    // this.usersService.addUser(
    //   this.person.email,
    //   this.person.password,
    //   this.person.name,
      // this.person.tel,
      // this.person.age,
      // this.person.sex,
      // this.person.lifestyle,
      // this.person.educational,
      // this.person.faculty,
      // this.person.year,
      // this.person.facebook,
      // this.person.instagram,
      // this.person.other
    // );
}
}
