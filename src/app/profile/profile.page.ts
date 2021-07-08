import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../api/users.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertController, ModalController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // user: Subscription;
  // tslint:disable-next-line:variable-name
  email_login = '';
  // tslint:disable-next-line:variable-name
  data_user_login = {};
  url = 'http://localhost:3000/user/getuserDetail';
  public userProfile: UserProfile;
  myId: string;
  myData: any;
  name: string;
  email: string;
  age: string;
  sex: string;
  educational: string;
  faculty: string;
  year: string;
  facebook: string;
  instagram: string;
  other: string;
  lifestyle: any;
  img: any;
  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private profileService: ProfileService,
              private alertCtrl: AlertController,
              private http: HttpClient,
              public modalCtrl: ModalController
              ) {
                this.email_login = localStorage.getItem('data_user');
                this.http.get<{messaeg: string, email: string, status: any}>(this.url + '/' + this.email_login).subscribe((res) => {
                  this.data_user_login = res;
                });
              }

  ngOnInit() {
    this.myId = localStorage.getItem('id_user');
    this.usersService.getidUser(this.myId).subscribe(data => {
      this.myData = data;
      this.name = this.myData.name;
      this.email = this.myData.email;
      this.lifestyle = this.myData.lifestyle;
      this.age = this.myData.age;
      this.sex = this.myData.sex;
      this.educational = this.myData.educational;
      this.faculty = this.myData.faculty;
      this.year = this.myData.year;
      this.facebook = this.myData.facebook;
      this.instagram = this.myData.instagram;
      this.other = this.myData.other;
      this.img = this.myData.img;
    });
    // this.usersService.getUser().subscribe(data => {
    //   console.log(data);
    // });
    // this.user = this.usersService.getUser().subscribe(data => {
    //   console.log(data);
    // });
    // this.profileService.getUserProfile().then(profile$ => {
    //   profile$.subscribe(userProfile => {
    //     this.userProfile = userProfile;
    //   });
    // });
  }
  // ngOnDestroy() {
    // this.user.unsubscribe();
  // }
  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your name',
      inputs: [
        {
          type: 'text',
          name: 'fullName',
          placeholder: 'Your full name',
          value: this.userProfile.fullName
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateName(data.fullName);
          }
        }
      ]
    });
    return await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
