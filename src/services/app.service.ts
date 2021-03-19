import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getJson(name: 'data' | 'county' | 'data-2' | 'all.geo' | 'topo') {
    return this.http.get(`assets/us-${name}.json`);
  }
}
