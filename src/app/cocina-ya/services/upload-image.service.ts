import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private apiUrl = 'https://api.imgbb.com/1/upload?key=528f827005962fe46ced16d1f2e74953';
  constructor(private http : HttpClient) { }

  upload(img:File):Observable<any>{
    const formData = new FormData();
    formData.append('image',img);
    return this.http.post(this.apiUrl,formData);
  }

  deleteImage(deleteUrl: string): Observable<any> {
    const proxyUrl = deleteUrl.replace('https://api.imgbb.com', '/api');
    return this.http.get(proxyUrl);
  }
  
  
}
