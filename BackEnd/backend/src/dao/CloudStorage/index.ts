//setting up cloud bucket, etc
import {Storage} from '@google-cloud/storage'



//bucket name
export const bucketName ='node-app-p1'


//base http path to the bucket
export const bucketURL = `https://storage.googleapis.com/${bucketName}`


//the bucket
export const imageBucket = new Storage().bucket(bucketName)