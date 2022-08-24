import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModule } from 'src/app/models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  public getAllIlustrations(): Observable <any>{
    const url = "http://localhost:8080/api/products/getIlustrations";
    return this.http.get(url);
  }
  public getAllImages(): Observable <any>{
    const url = "http://localhost:8080/api/products/getImages";
    return this.http.get(url);
  }
  public addProduct(prod:RegisterModule): Observable <any>{
    const url = "http://localhost:8080/api/users/registerUser";
    const headers = { 'content-type': 'application/json'} ;
    const body=JSON.stringify(prod);
    return this.http.post(url, body,{'headers':headers})
  }
  public getFotos(): Observable <any>{
    const url = "http://localhost:8080/api/products/getFotografias";
    return this.http.get(url);
  }
}
