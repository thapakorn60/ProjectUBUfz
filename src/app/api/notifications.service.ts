import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notiData: {};


  constructor(private http: HttpClient) { }
  addNotification(
    postId: string,
    postName: string,
    ownerName: string,
    ownerId: string,
    joinerName: string,
    joinerId: string,
    status: boolean,
    datetime: string,
    starttime: string,
    endtime: string,
    place: string,
    type: object,
    press: string,
    inject: boolean,
    description: string,
    read: boolean
  ){
    this.notiData = {
      postId,
      postName,
      ownerId,
      ownerName,
      joinerName,
      joinerId,
      status,
      datetime,
      starttime,
      endtime,
      place,
      type,
      press,
      inject,
      description,
      read
    };
    this.http.post('http://localhost:3000/notification/addNotification', this.notiData).subscribe((res) => {
      console.log(res);
    });
  }

  getNotification() {
    return this.http.get<{ response: any }>('http://localhost:3000/notification/getAllNotification');
  }

  getidNoti(id: string) {
    return this.http.get('http://localhost:3000/notification/getidNoti/' + id);
  }

  markRead(
    id: string,
    postId: string,
    postName: string,
    ownerName: string,
    ownerId: string,
    joinerName: string,
    joinerId: string,
    status: boolean,
    datetime: string,
    starttime: string,
    endtime: string,
    place: string,
    type: object,
    press: string,
    inject: boolean,
    description: string,
    read: boolean
  ){
    this.notiData = {
      postId,
      postName,
      ownerId,
      ownerName,
      joinerName,
      joinerId,
      status,
      datetime,
      starttime,
      endtime,
      place,
      type,
      press,
      inject,
      description,
      read
    };
    return this.http.put('http://localhost:3000/notification/read/' + id, this.notiData).subscribe(response => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  delete(id: string){
    console.log(id);
    this.http.delete('http://localhost:3000/notification/deleteNoti/' + id).subscribe(res => {
      console.log(res);
    });
  }


}
