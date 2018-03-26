import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
/*
  Generated class for the ImagefirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagefirebaseProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ImagefirebaseProvider Provider');
  }

  uploadImage(image: string): any {
    let userId = JSON.parse(localStorage.getItem('_currentUser')).uid;
    let storageRef = firebase.storage().ref();
    let imageName = this.generateUUID();
    let imageRef = storageRef.child(`${userId}/${imageName}.jpg`);
    return imageRef.putString(image, 'data_url')
  }

//   const result = this.camera.getPicture(options);
//   result.then(succes=>{
//   const selfieRef = firebase.storage().ref('images/itemPicture.png');
//   selfieRef.putString(succes, 'base64', {contentType: 'image/png'}).then(savedProfilePicture => {
//   this.image = savedProfilePicture.downloadURL
// });;
// }, error => {
//   // Log an error to the console if something goes wrong.
//   alert(JSON.stringify(error));
// });

  getImage(imageId: string): any {
    console.log('t dans la bonn functiioon');
    let userId = JSON.parse(localStorage.getItem('_currentUser')).uid;
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${imageId}.jpg`);
    imageRef.getDownloadURL().then(function(url){
      console.log("the URL Image is: " + url);
      let imageURL = url
      return imageURL
    })
  }

  private generateUUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
