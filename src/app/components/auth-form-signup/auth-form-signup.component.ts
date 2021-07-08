import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserCredential } from 'src/app/models/user';
import { LoadingController, AlertController } from '@ionic/angular';
import { UsersService } from 'src/app/api/users.service';


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form-signup.component.html',
  styleUrls: ['./auth-form-signup.component.scss']
})
export class AuthFormSignupComponent implements OnInit {
  public loading: HTMLIonLoadingElement;
  public authForm: FormGroup;
  person = {
    email: '',
    password: '',
    // cpassword: '',
    name: '',
    tel: '',
    age: '',
    sex: '',
    lifestyle: {},
    educational: '',
    faculty: '',
    year: '',
    facebook: '',
    instagram: '',
    other: '',
    // img: '',

  };
  @Input() actionButtonText: string;
  @Input() isPasswordResetPage = false;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private usersService: UsersService
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.minLength(6)]

    });
  }

  ngOnInit() {}

  submitCredentials(authForm: FormGroup): void {

    if (!authForm.valid) {
      console.log('Form is not valid yet, current value:', authForm.value);
    } else {
      this.showLoading();
      const credentials: UserCredential = {
        email: authForm.value.email,
        password: authForm.value.password
      };
      this.formSubmitted.emit(credentials);
      this.usersService.addUser(
        this.person.email,
        this.person.password,
        this.person.name,
        this.person.tel,
        this.person.age,
        this.person.sex,
        this.person.lifestyle,
        this.person.educational,
        this.person.faculty,
        this.person.year,
        this.person.facebook,
        this.person.instagram,
        this.person.other
      );
    }
  }

  async showLoading(): Promise<void> {
    try {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    } catch (error) {
      this.handleError(error);
    }
  }

  hideLoading(): Promise<boolean> {
    return this.loading.dismiss();
  }

  async handleError(error): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
    await alert.present();
  }
}
