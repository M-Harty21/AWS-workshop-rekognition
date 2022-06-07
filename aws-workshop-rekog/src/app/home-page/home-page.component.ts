import { Component, OnInit } from '@angular/core';
import { RekogApiService } from '../service/rekog-api.service';
import { Celebrity } from '../models/rekog-response';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data: any | undefined;
  celeb: Celebrity;
  emotionType: any;
  emotionConfidence: any;

  // =========

  selectedFiles: any = '';
  imageSrc: string = '';
  selectedFileToUpload: File | undefined;

  constructor(private rekogAPI: RekogApiService) { 
    this.celeb = new Celebrity;
  }

  ngOnInit(): void {
  }

  async getCelebrityData(){
    
    this.data = await this.rekogAPI.getCelebrityData(this.selectedFileToUpload?.name);

    console.log("Data return: " + this.data[0]);

    this.celeb.name = this.data[0].Name;
    this.celeb.gender = this.data[0].KnownGender.Type;
    this.emotionType = this.data[0].Face.Emotions[0].Type;
    this.emotionConfidence = this.data[0].Face.Emotions[0].Confidence;
    this.celeb.smile = this.data[0].Face.Smile;
  }

  async upload(){
    if (!this.selectedFileToUpload) {
        alert('Please select a file first!');
        return;
    }

    await this.rekogAPI.uploadCelebrityImage(this.selectedFileToUpload);
  }

  public selectFile(filesList: FileList | null) {
    var reader = new FileReader();
    const fileToUpload = filesList!.item(0);

    console.log(fileToUpload!.name);

    reader.readAsDataURL(fileToUpload!);
    reader.onload = () => {
        this.imageSrc = reader.result as string;
    };
    this.selectedFileToUpload = fileToUpload!;
  }

}
