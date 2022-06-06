import { Component, OnInit } from '@angular/core';
import { RekogApiService } from '../service/rekog-api.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private rekogAPI: RekogApiService) { }

  ngOnInit(): void {
  }

  test(){
    var data = this.rekogAPI.getCelebrityData("tom-hardy.jpg");
    console.log(data);
  }
}
