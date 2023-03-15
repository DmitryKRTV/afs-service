import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Category, Message } from '../models/categories.model'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private domain = environment.domain

  constructor(private http: HttpClient) {}

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.domain}/api/category`)
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.domain}/api/category/${id}`)
  }

  create(name: string, image?: File): Observable<Category> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    return this.http.post<Category>(`${this.domain}/api/category`, fd)
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    return this.http.patch<Category>(`${this.domain}/api/category/${id}`, fd)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.domain}/api/category/${id}`)
  }
}
