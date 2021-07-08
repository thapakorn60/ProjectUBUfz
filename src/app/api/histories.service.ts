import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HistoriesService {
  historyData: {};
  constructor(private http: HttpClient) { }

  addHistory(
    postId: string,
    postName: string,
    ownerName: string,
    ownerId: string,
    joinerName: string,
    joinerId: string,
    // status: boolean,
    datetime: string,
    starttime: string,
    endtime: string,
    place: string,
    type: object,

  ){
    this.historyData = {
      postId,
      postName,
      ownerId,
      ownerName,
      joinerName,
      joinerId,
      // status,
      datetime,
      starttime,
      endtime,
      place,
      type,

    };
    this.http.post('http://localhost:3000/history/addHistory', this.historyData).subscribe((res) => {
      console.log(res);
    });
  }

  getAllHistory() {
    return this.http.get<{ response: any }>('http://localhost:3000/history/getAllHistory');
  }

  deleteHistory(id: string){
    console.log(id);
    this.http.delete('http://localhost:3000/history/deleteHistory/' + id).subscribe(res => {
      console.log(res);
    });
  }
}
