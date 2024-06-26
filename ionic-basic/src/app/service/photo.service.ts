import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { PhotoUser } from '../interface/photo-user';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: PhotoUser[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor(
    private platform: Platform
  ) { }
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera,
      quality: 100 // highest quality (0 to 100)
    });

// Save the picture and add it to photo collection
  const savedImageFile = await this.savePicture(capturedPhoto);

    this.photos.unshift(savedImageFile);    
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });    
  }

  private async savePicture(photo: Photo) { 

      const base64Data = await this.readAsBase64(photo);

      // Write the file to the data directory
      const fileName = new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data
      });

      if (this.platform.is('hybrid')) {
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/building/webview#file-protocol
        return {
          filepath: savedFile.uri,
          webviewPath: Capacitor.convertFileSrc(savedFile.uri)
        };
      }
      else {
        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
          filepath: fileName,
          webviewPath: photo.webPath
        };
      }
  }  

  private async readAsBase64(photo: Photo| any) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadSaved() {
     // Retrieve cached photo array data
     const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });
     this.photos = JSON.parse(photoList.value?photoList.value:'') || [];

     // Easiest way to detect when running on the web:
     // “when the platform is NOT hybrid, do this”
     if (!this.platform.is('hybrid')) {
  
       for (let photo of this.photos) {

         const readFile = await Filesystem.readFile({
             path: photo.filepath,
             directory: Directory.Data
         });


         photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
       }
     }    
  }

  public async deletePicture(photo: PhotoUser, position: number) {

    this.photos.splice(position, 1);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  } 
}