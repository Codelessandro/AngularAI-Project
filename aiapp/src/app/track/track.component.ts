import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  data: any[] = [];
  train : boolean = true;
  trainLabel: string = "Couch";

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }


  coordinates(event: MouseEvent): void {
    const clientX = event.clientX;
    const clientY = event.clientY;

    if (this.data.length === 100) {
      this.dataService.addData(this.data, this.trainLabel, this.train);
    }

    this.data.push({
      x: clientX,
      y: clientY
    });
  }

  trainBackend() {
    this.dataService.trainBackend();
  }

}
