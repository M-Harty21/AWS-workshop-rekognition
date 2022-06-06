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
  celeb: Celebrity;

  constructor(private rekogAPI: RekogApiService) { 
    this.celeb = new Celebrity;
  }

  ngOnInit(): void {
  }

  async test(){
    this.data = await this.rekogAPI.getCelebrityData("tom-hardy.jpg");
    console.log(this.data[0]);
    this.celeb.name = this.data[0].Name;
    this.celeb.gender = this.data[0].KnownGender.Type;
    this.celeb.emotions = this.data[0].Face.Emotions;
    this.celeb.smile = this.data[0].Face.Smile;

    console.log(this.celeb.emotions);
  }

}
