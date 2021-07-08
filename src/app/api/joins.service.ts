import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JoinsService {
  logData: {};

  constructor(private http: HttpClient) { }
  addJoin(
    postId: string,
    postName: string,
    ownerName: string,
    ownerId: string,
    joinerName: string,
    joinerId: string,
    status: boolean,
    datetime: Date,
    starttime: Date,
    endtime: Date,
    place: string,
    type: object
  ){
    this.logData = {
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
      type
    };
    this.http.post('http://localhost:3000/join/addjoin', this.logData).subscribe((res) => {
      console.log(res);
    });
  }
  getJoin() {
    return this.http.get<{ response: any }>('http://localhost:3000/join/getjoin');
  }
  getjoinDetail(postId: string, joinerId: string){
    this.http.get('http://localhost:3000/join/getjoinDetail/' + postId + '/' + joinerId).subscribe(res => {
      console.log(res);
    });
  }
  getJoinPostId(postId: string){
    return this.http.get('http://localhost:3000/join/getJoinPostId/' + postId);
  }

  leaveJoin(id: string) {
    console.log(id);
    this.http.delete('http://localhost:3000/join/leavejoin/' + id).subscribe(res => {
      console.log(res);
    });

  }

  deleteJoinPost(postId: string) {
    console.log(postId);
    this.http.delete('http://localhost:3000/join/deleteJoinPost/' + postId).subscribe(res => {
      console.log(res);
    });

  }

  acceptjoin(
    id: string,
    postId: string,
    postName: string,
    ownerName: string,
    ownerId: string,
    joinerName: string,
    joinerId: string,
    status: boolean,
    datetime: Date,
    starttime: Date,
    endtime: Date,
    place: string,
    type: object
  ){
    const joinData = {
      postId,
      postName,
      ownerName,
      ownerId,
      joinerName,
      joinerId,
      status,
      datetime,
      starttime,
      endtime,
      place,
      type
    };
    console.log('Formdata :', joinData);
    return this.http.put('http://localhost:3000/join/acceptjoin/' + id, joinData).subscribe(response => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  getidJoin(id: string) {
    return this.http.get('http://localhost:3000/join/getidjoin/' + id);
  }

}
