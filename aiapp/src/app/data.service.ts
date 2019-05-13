import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  addData(coordinates: any, label: string, train: boolean) {
    if (train) {
      this.httpClient.post("http://localhost:8081/data", {coordinates: coordinates, label: label}).subscribe(
        data => {
          alert(data.message)
        },
        error => {
          console.log(error)
        })
    } else {
      this.httpClient.post("http://localhost:8081/predict", {coordinates: coordinates}).subscribe(data => {
        alert(data.predictedLabel)
      }
    }
  }

  trainBackend() {
    this.httpClient.get("http://localhost:8081/train/").subscribe(data => {
      alert(data.message)
    })
  }
}
