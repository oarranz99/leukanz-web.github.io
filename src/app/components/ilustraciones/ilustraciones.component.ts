import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image/image.service';
import { ProductsService } from 'src/app/services/products/products.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { ProductClass } from 'src/app/models/product-class.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Byte } from '@angular/compiler/src/util';

@Component({
  selector: 'app-ilustraciones',
  templateUrl: './ilustraciones.component.html',
  styleUrls: ['./ilustraciones.component.css']
})
export class IlustracionesComponent implements OnInit {
  public ilustrationList: Array<ProductClass> = [];
  public modalOpen = false;
  public modalIlustration!: {
    name : string,
    description : string,
    image : SafeUrl,
    type : string,
    date : Date
  };
  constructor(private productService : ProductsService,
              private imageService : ImageService,
              private sanitizer: DomSanitizer,
              private SpinnerService : NgxSpinnerService) { 
      
  }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.getIlustraciones();
    
  }

  public getIlustraciones(){
    
    this.productService.getAllIlustrations().subscribe(
      (resp) => {
        if(resp.status == "Ok"){
          if(resp.data != null){
            let name , description , imageUrl , id, type, date;
            for (let index = 0; index < resp.data.length; index++) {
              type = resp.data[index].fileType 
              let imageUrlBase64= 'data:'+ type+';base64,' + this.imageService._toBase64(resp.data[index].fileData);
              name = resp.data[index].name;
              description = resp.data[index].description;
              id = resp.data[index].id;
              date = resp.data[index].insertDate
              imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrlBase64)
              this.ilustrationList.push(new ProductClass (description,name,imageUrl,id, type,date));
            }
          }
        }
        this.SpinnerService.hide();
      },
      (error)=>{
        console.log(error) 
      });
  }
  public toggleShow(obj : ProductClass){
    this.modalOpen = ! this.modalOpen;
    if(this.modalOpen == true){
      this.modalIlustration = {
        name: obj.name,
        description: obj.description,
        image:obj.image,
        type: obj.type,
        date:  obj.insertDate};
    }
  }
  public modalClose(){this.modalOpen = !this.modalOpen}
}

