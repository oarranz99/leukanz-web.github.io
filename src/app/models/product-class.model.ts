
import { SafeUrl } from "@angular/platform-browser";

export class ProductClass {
    public id : number; 
    public description : string;
    public name : string;
    public image : SafeUrl;
    public type : string
    public insertDate : Date;
    
    constructor(description : string, name : string, image : SafeUrl, id:number, type : string, uploadDate : Date){
        this.description = description;
        this.name = name;
        this.image = image;
        this.id = id;
        this.type = type;
        this.insertDate = uploadDate;
    }
    
}
