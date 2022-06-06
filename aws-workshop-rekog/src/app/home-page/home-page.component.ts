import { Component, OnInit } from '@angular/core';
import { RekogApiService } from '../service/rekog-api.service';
import { Celebrity } from '../models/rekog-response';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data: any;
  celebObj: Celebrity;

  constructor(private rekogAPI: RekogApiService) { 
    this.celebObj = new Celebrity;
  }

  ngOnInit(): void {
  }

  async test(){
    this.data = await this.rekogAPI.getCelebrityData("tom-hardy.jpg");
    console.log(this.data[0]);
    this.celebObj.name = this.data[0].Name;
    this.celebObj.gender = this.data[0].KnownGender.Type;
    this.celebObj.emotions = this.data[0].Face.Emotions;
    this.celebObj.smile = this.data[0].Face.Smile;

    console.log(this.celebObj);
  }

}
