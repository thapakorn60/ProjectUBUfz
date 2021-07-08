import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../api/users.service';
import { FormBuilder, FormGroup } from "@angular/forms";
// import { ImagePickerOptions } from '@ionic-native/image-picker';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cpass = {
    cpass :''
  }
  person = {
    email: '' ,
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
    img: null
  };
  personEdit = {
    email: '',
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
    img: ''
  };
  mode: string;
  userId: string;
  image: string | ArrayBuffer;
  form: FormGroup;
  // defultImg = 'D:\Project\Project\Test\UBUFz\src\app\register\503257-200.png';
  constructor(public usersService: UsersService,
              public router: Router,
              private route: ActivatedRoute,
              public fb: FormBuilder,
              public toastController: ToastController) {
                this.form = this.fb.group({
                //   email: '',
                //   password: '',
                //   // cpassword: '',
                //   name: '',
                //   tel: '',
                //   age: '',
                //   sex: '',
                //   lifestyle: {},
                //   educational: '',
                //   faculty: '',
                //   year: '',
                //   facebook: '',
                //   instagram: '',
                //   other: '',
                  img: null
                })
               }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap.has('id'));
      if (paramMap.has('id')) {
        this.mode = 'edit';
        console.log(this.mode);
        this.userId = paramMap.get('id');
        // console.log(id);
        this.usersService.getidUser(this.userId).subscribe(data => {
          console.log(data);
          this.person = {
            email: data['email'],
            password: data['password'],
            name: data['name'],
            tel: data['tel'],
            age: data['age'],
            sex: data['sex'],
            lifestyle: data['lifestyle'],
            educational: data['educational'],
            faculty: data['faculty'],
            year: data['year'],
            facebook: data['facebook'],
            instagram: data['instagram'],
            other: data['other'],
            img: data['img']
          }
        });

      } else {
        this.mode = 'create';
      }
    });
  }


  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      img: file
    });
    this.form.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  async register() {
    if (this.mode == 'edit') {
      if(this.person.email == '' || this.person.lifestyle == '' || this.person.name == ''){
        const toast = await this.toastController.create({
          message: 'กรอกข้อมูลไม่ครบ',
          duration: 2000
        });
        toast.present();
      }else{
      this.usersService.editUser(
        this.userId,
        this.person.email,
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
        this.person.other,
        this.form.value.img,
      );}
    }else {
      if(this.person.email == '' || this.person.password == '' || this.person.lifestyle == '' || this.person.name == ''){
        const toast = await this.toastController.create({
          message: 'กรอกข้อมูลไม่ครบ',
          duration: 2000
        });
        toast.present();

      }else if(this.person.password.length < 10){
        const toast = await this.toastController.create({
          message: 'รหัสผ่านไม่ครบ',
          duration: 2000
        });
        toast.present();
      }else if(this.person.password != this.cpass.cpass){
          const toast = await this.toastController.create({
            message: 'รหัสผ่านไม่ตรงกัน',
            duration: 2000
          });
          toast.present();
      }else{
        const email = this.person.email + '@ubu.ac.th';
      this.usersService.addUser(
          email,
          // this.person.email,
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
          this.person.other,
          this.form.value.img,
      );
    }
    console.log('form naja',this.person);
    this.router.navigateByUrl('login');
    }
  }




  logData(){
    }
}

