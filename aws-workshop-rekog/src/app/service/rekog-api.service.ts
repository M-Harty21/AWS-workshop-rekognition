import { Injectable } from '@angular/core';
import { RecognizeCelebritiesCommand } from "@aws-sdk/client-rekognition";
import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { environment } from 'src/environments/environment';
import * as S3 from 'aws-sdk/clients/s3';

const REGION = "us-east-1";
const CREDENTIALS = {
  accessKeyId: environment.ACCESS_KEY_ID!, 
  secretAccessKey: environment.SECRET_KEY!,
};

const rekogClient = new RekognitionClient({ region: REGION, credentials: CREDENTIALS});
const s3Client = new S3({region: REGION, credentials: CREDENTIALS});

const bucket = 'aws-workshop-celebrity-database';

@Injectable({
  providedIn: 'root'
})
export class RekogApiService {

  constructor() { }

  // Gets the celebrity data from the AWS Rekognition service
  async getCelebrityData(fileName: any) {
    const params = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: fileName
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

  async uploadCelebrityImage(file: any) {
      const contentType = file.type;
     
      const params = {
        Bucket: bucket,
        Key: file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };
      s3Client.upload(params, function(err: any, data: any){
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
        console.log('Successfully uploaded file.', data);
        return true;
      });
  }

}

