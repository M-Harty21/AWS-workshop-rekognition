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
      const rekogResponse = await rekogClient.send(new RecognizeCelebritiesCommand(params));
      return rekogResponse.CelebrityFaces;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async uploadCelebrityImage(image: any) {
    
  }

}
function celebrity(celebrity: any, arg1: any, arg2: { return: any; }) {
  throw new Error('Function not implemented.');
}

