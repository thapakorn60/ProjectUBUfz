import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { UsersService } from '../api/users.service';



@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.page.html',
  styleUrls: ['./profileuser.page.scss'],
})
export class ProfileuserPage implements OnInit {
  @Input() userid: string;
  userData: any;
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
  constructor(public modalCtrl: ModalController,
              public userService: UsersService) { }

  ngOnInit() {
    console.log(this.userid);
    this.userService.getidUser(this.userid).subscribe(data => {
      this.userData = data;
      this.img = this.userData.img;
      this.name = this.userData.name;
      this.email = this.userData.email;
      this.lifestyle = this.userData.lifestyle;
      this.age = this.userData.age;
      this.sex = this.userData.sex;
      this.educational = this.userData.educational;
      this.faculty = this.userData.faculty;
      this.year = this.userData.year;
      this.facebook = this.userData.facebook;
      this.instagram = this.userData.instagram;
      this.other = this.userData.other;
      // this. = this.userData.;
      // this. = this.userData.;
      // console.log(this.name);
    });

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

}
