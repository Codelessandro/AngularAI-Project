import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  addData(coordinates: any, label: string) {
    alert("Tracking Done")
    this.httpClient.post("http://localhost:8081/", {coordinates: coordinates, label: label}).subscribe(data => {
      },
      error => {
        console.log(error)
      })
  }
}
