import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/api/users.service';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  allUser: any;

  constructor(private userService: UsersService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.userService.getallUser().subscribe(data => {
      this.allUser = data;
      console.log(this.allUser);
    });
  }

  async deleteUser(){
  const alert = await this.alertController.create({
    header: 'ลบ User คนนี้',
    message: 'คุณต้องการที่จะลบผูใช้คนนี้',
    buttons: [
      {
        text: 'ยกเลิก',
        cssClass: 'secondary',
        handler: (blah) => {
          // console.log('Cancel');
        }
      },
      {
        text: 'ตกลง',
        handler: () => {
          console.log();
        }
      }
    ]
  });
  await alert.present();

}
}
