import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-fotografia',
  templateUrl: './fotografia.component.html',
  styleUrls: ['./fotografia.component.css']
})
export class FotografiaComponent implements OnInit {
  public  fotosBsae64: Array<any> = [];
  public fotoIndiv : any ;
  constructor(private productService : ProductsService, private sanitizer: DomSanitizer, private SpinnerService : NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show()
    this.getImages()
  }

  public getImages(){
    this.productService.getFotos().subscribe(resp => {
      if(resp.status == "Ok"){
        if(resp.data != null){
          for (let index = 0; index < resp.data.length; index++) {
            let objectUrl = 'data:image/jpg;base64,' + this._toBase64(resp.data[index].imagen);
            this.fotosBsae64.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
            this.fotoIndiv = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          }
        }
      }
      this.SpinnerService.hide()
    })
  }
  public _toBase64(buffer : any){
      var binary = "";
      var bytes = new Uint8Array(buffer);
      var len = bytes.length;
      for (let index = 0; index < len; index++) {
        binary += String.fromCharCode(bytes[index]);
      }
      return window.btoa(binary)
  }
}
