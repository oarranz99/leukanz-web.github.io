import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private sanitizer : DomSanitizer) { }

  /**
   * Convert image from byte to Base64 to image URL
   */
   public _toBase64(buffer : any){
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.length;
    for (let index = 0; index < len; index++) {
      binary += String.fromCharCode(bytes[index]);
    }
    return window.btoa(binary)
}
  /**
   * Convert from url image to Blob []
   */
  public async srcToBlob(url : string ) {
    let blob = await fetch(url).then(r => r.blob());
    return blob;
  }
}
