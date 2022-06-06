import { Injectable } from '@angular/core';
import { RecognizeCelebritiesCommand } from "@aws-sdk/client-rekognition";
import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { S3Client } from '@aws-sdk/client-s3';
import { environment } from 'src/environments/environment';

const REGION = "us-east-1";
const CREDENTIALS = {
  accessKeyId: environment.ACCESS_KEY_ID!, 
  secretAccessKey: environment.SECRET_KEY!,
};

const rekogClient = new RekognitionClient({ region: REGION, credentials: CREDENTIALS});
const s3Client = new S3Client({region: REGION, credentials: CREDENTIALS});

const bucket = 'aws-workshop-celebrity-database';

@Injectable({
  providedIn: 'root'
})
export class RekogApiService {

  constructor() { }

  // Gets the celebrity data from the AWS Rekognition service
  async getCelebrityData(celebrityImg: any) {
    const params = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: celebrityImg
        },
      },
    }

    try {
      const response = await rekogClient.send(new RecognizeCelebritiesCommand(params));
      console.log(response.CelebrityFaces?.length);
      response.CelebrityFaces?.map(celebrity => {
        console.log(`Name: ${celebrity.Name}`)
        console.log(`ID: ${celebrity.Id}`)
        console.log(`KnownGender: ${celebrity.KnownGender?.Type}`)
      })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async uploadCelebrity() {

  }

}
