import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly filePath = 'assets/us';

  constructor(private http: HttpClient) {}

  getUSMap() {
    return this.http.get(`assets/us/us-all.geo.json`);
  }
  getUSMapCountiesJson(path: string) {
    return this.http.get(`assets/us/${path}-all.geo.json`);
  }

  getJson(name: 'data' | 'county' | 'data-2' | 'all.geo' | 'topo') {
    return this.http.get(`assets/us-${name}.json`);
  }
}
