import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url: any = 'http://localhost:3000/post/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  logData: {};
  userId: string;
  userEmail: string;
  constructor(private http: HttpClient, public router: Router) { }
  getallPost() {
    return this.http.get<{ response: any }>('http://localhost:3000/post/getallpost');
  }

  editPost(
    id: string,
    name: string,
    eventname: string,
    userid: string,
    description: string,
    type: string,
    datetime: string,
    starttime: string,
    endtime: string,
    place: string,
    location: string,
    amount: number,
    remain: number
  ){
    const postData = {
      name,
      eventname,
      userid,
      description,
      type,
      datetime,
      starttime,
      endtime,
      place,
      location,
      amount,
      remain
    };
    console.log('Formdata :', postData);
    return this.http.put('http://localhost:3000/post/editpost/' + id, postData).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    }, (error) => {
      console.log(error);
    });
  }
  getidPost(id: string) {
    return this.http.get('http://localhost:3000/post/getidpost/' + id);
  }

  deletePost(id: string) {
    console.log(id);
    this.http.delete('http://localhost:3000/post/deletepost/' + id).subscribe(res => {
      console.log(res);
    });

  }
  addPost(
    name: string,
    eventname: string,
    userid: string,
    description: string,
    type: {},
    datetime: string,
    starttime: string,
    endtime: string,
    place: string,
    location: string,
    amount: number,
    remain: number
    // reqtojoin: []
  ) {
    this.logData = {
      name,
      eventname,
      userid,
      description,
      type,
      datetime,
      starttime,
      endtime,
      place,
      location,
      amount,
      remain
      // reqtojoin
    };
    console.log(this.logData);
    this.http.post('http://localhost:3000/post/addpost', this.logData).subscribe((res) => {
      console.log(res);
      // this.router.navigate(['/home']);
    }, (error) => {
      console.log(error);
    });
  }
  tojoin(
    postId: string,
    name: string,
    eventname: string,
    userid: string,
    description: string,
    type: object,
    datetime: string,
    starttime: string,
    endtime: string,
    place: string,
    location: object,
    amount: number,
    reqtojoin: Array<any>,
    joinerId: string,
    status: boolean,
    // allpost: any
    ) {
    // tslint:disable-next-line:max-line-length
    const join = { name, eventname, userid,  description, type, datetime, starttime, endtime, place, location, amount, reqtojoin, joinerId, status };
    console.log(join);
    this.http.put(this.url + 'editpost/' + postId, join).subscribe(response => {
      console.log(response);

    });
  }
}
